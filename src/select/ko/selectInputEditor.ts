import * as ko from "knockout";
import template from "./selectInputEditor.html";
import { StyleService } from "@paperbits/styles";
import { SelectInputModel } from "../selectInputModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { SelectInputOption } from "./selectInputOption";


@Component({
    selector: "select-input-editor",
    template: template
})
export class SelectEditor {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly placeholder: ko.Observable<string>;
    public readonly required: ko.Observable<boolean>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly options: ko.ObservableArray<SelectInputOption>;

    public readonly appearanceStyle: ko.Observable<string>;
    public readonly appearanceStyles: ko.ObservableArray<any>;

    public itemNameToAdd: ko.Observable<string>;
    public itemValueToAdd: ko.Observable<string>;
    public selectedItems: ko.ObservableArray<string>;



    constructor(private readonly styleService: StyleService) {
        this.label = ko.observable<string>();
        this.name = ko.observable<string>();
        this.required = ko.observable<boolean>();
        this.readonly = ko.observable<boolean>();
        this.options = ko.observableArray<SelectInputOption>();
        this.placeholder = ko.observable<string>();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();


        this.itemNameToAdd = ko.observable("");
        this.itemValueToAdd = ko.observable("");
        this.selectedItems = ko.observableArray([]);
    }

    @Param()
    public model: SelectInputModel;

    @Event()
    public onChange: (model: SelectInputModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.label(this.model.label);
        this.name(this.model.name);
        this.placeholder(this.model.placeholder);
        this.required(this.model.required);
        this.readonly(this.model.readonly);
        this.options(this.model.options);
        this.selectedItems([this.model.value]);

        if (this.model.styles) {
            const variations = await this.styleService.getComponentVariations("formControl");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle(<string>this.model.styles?.appearance);
        }

        this.appearanceStyle.subscribe(this.applyChanges);
        this.label.subscribe(this.applyChanges);
        this.name.subscribe(this.applyChanges);
        this.required.subscribe(this.applyChanges);
        this.readonly.subscribe(this.applyChanges);
        this.options.subscribe(this.applyChanges);
        this.placeholder.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.label = this.label();
        this.model.name = this.name();
        this.model.readonly = this.readonly();
        this.model.required = this.required();
        this.model.options = this.options();
        this.model.placeholder = this.placeholder();

        this.model.styles = {
            appearance: this.appearanceStyle()
        };

        this.onChange(this.model);
    }

    public addItem(): void {
        if (this.itemNameToAdd() !== "" && this.itemValueToAdd() !== "" &&
            !this.options().find((item) => item.value === this.itemValueToAdd())) {
            this.options.push({ label: this.itemNameToAdd(), value: this.itemValueToAdd() });
            this.onChange(this.model);
        }
        this.itemNameToAdd("");
        this.itemValueToAdd("");
    }

    public upItem(): void {
        const selectedFirstValue = this.selectedItems()[0];
        const selectedLastValue = this.selectedItems()[this.selectedItems().length - 1];
        const posFirst = this.options().findIndex(item => item.value === selectedFirstValue);
        const posLast = this.options().findIndex(item => item.value === selectedLastValue);

        if (posFirst > 0) {
            const moveItem = this.options.splice(posFirst - 1, 1);

            this.options.splice(posLast, 0, moveItem[0]);
            this.onChange(this.model);
        }
    }

    public downItem(): void {
        const selectedFirstValue = this.selectedItems()[0];
        const selectedLastValue = this.selectedItems()[this.selectedItems().length - 1];
        const posFirst = this.options().findIndex(item => item.value === selectedFirstValue);
        const posLast = this.options().findIndex(item => item.value === selectedLastValue);

        if (posLast < this.options().length - 1) {
            const moveItem = this.options.splice(posLast + 1, 1);
            this.options.splice(posFirst, 0, moveItem[0]);
            this.onChange(this.model);
        }
    }

    public deleteItem(): void {
        if (this.selectedItems().length > 0) {
            this.options.remove((item) => this.selectedItems().findIndex(selectedValue => selectedValue === item.value) !== -1);
            this.onChange(this.model);
            this.selectedItems([]);
        }
    }

    public setSelectedItemDefault(): void {
        if (this.selectedItems().length === 0) {
            return;
        }

        const selectedValue = this.selectedItems()[0];
        this.model.value = selectedValue;
        this.onChange(this.model);
    }
}