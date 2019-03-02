/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import * as ko from "knockout";
import * as mapping from "knockout-mapping";
import template from "./inputEditor.html";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { InputModel, OptionItem } from "../inputModel";
import { InputProperty } from "../inputProperty";
import { changeRateLimit } from "@paperbits/core/ko/consts";
import { Bag } from "@paperbits/common";

interface EditorSection {
    sectionName: string;
    editors: ko.ObservableArray<EditorItem>;
    options?: ko.ObservableArray<OptionItem>;
}

interface EditablePropertyOption {
    label: string;
    value: string;
}

interface EditableProperty {
    name: string;
    label: string;
    inputType: string;
    options?: EditablePropertyOption[];
    placeholder?: string;
}

interface EditorItem {
    propertyLabel: string;
    propertyType: string;
    propertyName: string;
    propertyValue: ko.Observable<any>;
    propertyOptions?: { label: string, value: any }[];
    placeholder: string;
}
@Component({
    selector: "input-editor",
    template: template,
    injectable: "inputEditor"
})
export class InputEditor {
    public controlType: ko.Observable<string>;
    public editorSections: ko.ObservableArray<EditorSection>;
    public optionsSection: EditorSection;
    public showOptions: ko.Observable<boolean>;
    public itemNameToAdd: ko.Observable<string>;
    public itemValueToAdd: ko.Observable<string>;
    public selectedItems: ko.ObservableArray<string>;

    private sectionPropertyMap: Bag<EditableProperty> = {
        inputName: { name: "Main", label: "Name", inputType: "text" },
        placeholderText: { name: "Settings", label: "Placeholder text", inputType: "text" },
        help: { name: "Settings", label: "Help text", inputType: "text" },
        textValue: { name: "Settings", label: "Default text", inputType: "text" },
        inputValue: { name: "Settings", label: "Value", inputType: "text", placeholder: "e.g. Abc" },
        isInline: { name: "Settings", label: "Is inline", inputType: "checkbox" },
        maxLength: { name: "Settings", label: "Max number of characters allowed", inputType: "number" },
        minValue: { name: "Settings", label: "Minimum value", inputType: "number" },
        maxValue: { name: "Settings", label: "Maximum value", inputType: "number" },
        sizeValue: { name: "Settings", label: "Size value", inputType: "number" },
        stepValue: { name: "Settings", label: "Step value", inputType: "number" },
        isChecked: { name: "Settings", label: "Is checked", inputType: "checkbox" },
        patternRegexp: { name: "Settings", label: "Pattern", inputType: "text" },
        accept: { name: "Settings", label: "Accept value", inputType: "text" },
        colsCount: { name: "Settings", label: "Visible width of characters", inputType: "number" },
        rowsCount: { name: "Settings", label: "Visible number of lines", inputType: "number" },
        isRequired: { name: "Settings", label: "Is required", inputType: "checkbox" },
        isReadonly: { name: "Miscellaneous", label: "Is read-only", inputType: "checkbox" },
        isDisabled: { name: "Miscellaneous", label: "Is disabled", inputType: "checkbox" },
        showLabel: {
            name: "Settings", label: "", inputType: "radio", options: [
                { label: "None", value: "none" },
                { label: "Before", value: "before" },
                { label: "After", value: "after" }
            ]
        },
        labelText: { name: "Settings", label: "Label text", inputType: "text" },
    };

    private itemMapping = {
        copy: ["propertyName"]
    };

    constructor() {
        this.controlType = ko.observable<string>();
        this.showOptions = ko.observable(false);
        this.itemNameToAdd = ko.observable("");
        this.itemValueToAdd = ko.observable("");
        this.selectedItems = ko.observableArray([]);

        this.optionsSection = {
            sectionName: "Options",
            editors: ko.observableArray<EditorItem>(),
            options: ko.observableArray([])
        };

        const sections: EditorSection[] = [
            { sectionName: "Main", editors: ko.observableArray<EditorItem>() },
            { sectionName: "Label", editors: ko.observableArray<EditorItem>() },
            this.optionsSection,
            { sectionName: "Settings", editors: ko.observableArray<EditorItem>() },
            { sectionName: "Miscellaneous", editors: ko.observableArray<EditorItem>() }
        ];

        this.editorSections = ko.observableArray<EditorSection>();
        this.editorSections(sections);
    }

    @Param()
    public model: InputModel;

    @Event()
    public onChange: (model: InputModel) => void;

    @OnMounted()
    public initialize(): void {
        if (!this.model || (this.model && this.model.inputType !== this.model.inputType)) {
            this.controlType(this.model.inputType);
            this.adjustControlsMetadata(this.model.inputType);
        }

        if (this.model.properties.length > 0) {
            if (this.model.options) {
                this.optionsSection.options(this.model.options);
                this.optionsSection.options.subscribe(this.onOptionsChange);
                this.showOptions(true);
            }
            else {
                this.showOptions(false);
            }
            const defaultSection = this.editorSections()[this.editorSections().length - 1];

            for (const inputProperty of this.model.properties) {
                const sectionMetadata = this.sectionPropertyMap[inputProperty.propertyName];
                const edit: EditorItem = mapping.fromJS(inputProperty, this.itemMapping);

                edit.propertyLabel = sectionMetadata.label;
                edit.propertyType = sectionMetadata.inputType;
                edit.propertyOptions = sectionMetadata.options || [];
                edit.placeholder = sectionMetadata.placeholder;
                edit.propertyValue.extend(changeRateLimit);
                edit.propertyValue.subscribe(this.applyChanges);

                if (!sectionMetadata) {
                    defaultSection.editors.push(edit);
                }
                else {
                    const section = this.editorSections().find((item) => item.sectionName === sectionMetadata.name);
                    section.editors.push(edit);
                }
            }
        }

        this.itemNameToAdd.subscribe(this.copyNameToValue, null, "beforeChange");
    }

    private adjustControlsMetadata(inputType: string): void {
        switch (inputType) {
            case "date":
                this.sectionPropertyMap["inputValue"].inputType = "date";
                this.sectionPropertyMap["minValue"].inputType = "date";
                this.sectionPropertyMap["maxValue"].inputType = "date";
                break;
            case "time":
                this.sectionPropertyMap["inputValue"].inputType = "time";
                this.sectionPropertyMap["minValue"].inputType = "time";
                this.sectionPropertyMap["maxValue"].inputType = "time";
                break;
            default:
                this.sectionPropertyMap["inputValue"].inputType = "text";
                this.sectionPropertyMap["minValue"].inputType = "number";
                this.sectionPropertyMap["maxValue"].inputType = "number";
                break;
        }
    }

    private applyChanges(): void {
        const currentEdits: InputProperty[] = [];
        for (const section of this.editorSections()) {
            currentEdits.push(...mapping.toJS(section.editors));
        }
        this.model.properties = currentEdits;
        this.onChange(this.model);
    }

    private onOptionsChange(): void {
        this.model.options = mapping.toJS(this.optionsSection.options);
        this.onChange(this.model);
    }

    public addItem(): void {
        if (this.itemNameToAdd() !== "" && this.itemValueToAdd() !== "" &&
            !this.optionsSection.options().find((item) => item.itemValue === this.itemValueToAdd())) {
            this.optionsSection.options.push({ itemName: this.itemNameToAdd(), itemValue: this.itemValueToAdd() });
            this.onChange(this.model);
        }
        this.itemNameToAdd("");
        this.itemValueToAdd("");
    }

    public upItem(): void {
        const selectedFirstValue = this.selectedItems()[0];
        const selectedLastValue = this.selectedItems()[this.selectedItems().length - 1];
        const posFirst = this.optionsSection.options().findIndex(item => item.itemValue === selectedFirstValue);
        const posLast = this.optionsSection.options().findIndex(item => item.itemValue === selectedLastValue);

        if (posFirst > 0) {
            const moveItem = this.optionsSection.options.splice(posFirst - 1, 1);

            this.optionsSection.options.splice(posLast, 0, moveItem[0]);
            this.onChange(this.model);
        }
    }

    public downItem(): void {
        const selectedFirstValue = this.selectedItems()[0];
        const selectedLastValue = this.selectedItems()[this.selectedItems().length - 1];
        const posFirst = this.optionsSection.options().findIndex(item => item.itemValue === selectedFirstValue);
        const posLast = this.optionsSection.options().findIndex(item => item.itemValue === selectedLastValue);

        if (posLast < this.optionsSection.options().length - 1) {
            const moveItem = this.optionsSection.options.splice(posLast + 1, 1);
            this.optionsSection.options.splice(posFirst, 0, moveItem[0]);
            this.onChange(this.model);
        }
    }

    public deleteItem(): void {
        if (this.selectedItems().length > 0) {
            this.optionsSection.options.remove((item) => this.selectedItems().findIndex(selectedValue => selectedValue === item.itemValue) !== -1);
            this.onChange(this.model);
            this.selectedItems([]);
        }
    }

    public setSelectedItemDefault(): void {
        if (this.selectedItems().length > 0) {
            const selectedValue = this.selectedItems()[0];

            this.model.setProperty("inputValue", selectedValue);

            for (const section of this.editorSections()) {
                const editor = section.editors().find(edit => edit.propertyName === "inputValue");

                if (editor) {
                    editor.propertyValue(selectedValue);
                    return;
                }
            }
        }
    }

    private copyNameToValue(newValue): void {
        if (this.itemValueToAdd() === this.itemNameToAdd()) {
            setTimeout(() => {
                this.itemValueToAdd(this.itemNameToAdd());
            }, 100);
        }
    }
}