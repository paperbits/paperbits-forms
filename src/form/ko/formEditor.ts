import * as ko from "knockout";
import template from "./formEditor.html";
import { IViewManager } from '@paperbits/common/ui';
import { IWidgetEditor } from '@paperbits/common/widgets';
import { Component } from "@paperbits/core/ko/component";
import { FormModel } from "../formModel";
import { OptionItem, InputModel } from "../../input";

@Component({
    selector: "form-editor",
    template: template,
    injectable: "formEditor"
})
export class FormEditor implements IWidgetEditor {
    private formModel: FormModel;
    private applyChangesCallback: () => void;

    public readonly formAction:KnockoutObservable<string>;
    public readonly formMethod?:KnockoutObservable<string>;
    public readonly formTarget?:KnockoutObservable<string>;
    public readonly acceptCharset?:KnockoutObservable<string>;
    public readonly encType?:KnockoutObservable<string>;
    public readonly isFieldset?:KnockoutObservable<boolean>;
    public readonly legendText?:KnockoutObservable<string>;
    public readonly legendAlign?:KnockoutObservable<string>;
    public readonly isInline?:KnockoutObservable<boolean>;
    
    public itemNameToAdd: KnockoutObservable<string>;
    public itemValueToAdd: KnockoutObservable<string>;
    public selectedItems: KnockoutObservableArray<string>;
    public hiddenInputs: KnockoutObservableArray<OptionItem>;

    constructor(private viewManager: IViewManager) {
        this.formAction    = ko.observable<string>();
        this.formMethod    = ko.observable<string>();
        this.formTarget    = ko.observable<string>();
        this.acceptCharset = ko.observable<string>();
        this.encType       = ko.observable<string>();
        this.isFieldset    = ko.observable<boolean>();
        this.legendText    = ko.observable<string>();
        this.legendAlign   = ko.observable<string>();
        this.isInline      = ko.observable<boolean>();

        this.setWidgetModel = this.setWidgetModel.bind(this);

        this.formAction   .subscribe(((newValue) => {this.formModel.formAction    = newValue;this.applyChangesCallback();}).bind(this));  
        this.formMethod   .subscribe(((newValue) => {this.formModel.formMethod    = newValue;this.applyChangesCallback();}).bind(this));
        this.formTarget   .subscribe(((newValue) => {this.formModel.formTarget    = newValue;this.applyChangesCallback();}).bind(this));
        this.acceptCharset.subscribe(((newValue) => {this.formModel.acceptCharset = newValue;this.applyChangesCallback();}).bind(this));
        this.encType      .subscribe(((newValue) => {this.formModel.encType       = newValue;this.applyChangesCallback();}).bind(this));
        this.isFieldset   .subscribe(((newValue) => {this.formModel.isFieldset    = newValue;this.applyChangesCallback();}).bind(this));
        this.legendText   .subscribe(((newValue) => {this.formModel.legendText    = newValue;this.applyChangesCallback();}).bind(this));
        this.legendAlign  .subscribe(((newValue) => {this.formModel.legendAlign   = newValue;this.applyChangesCallback();}).bind(this));
        this.isInline     .subscribe(((newValue) => {this.formModel.isInline      = newValue;this.applyChangesCallback();}).bind(this));
        
        this.itemNameToAdd = ko.observable("");
        this.itemValueToAdd = ko.observable("");
        this.selectedItems = ko.observableArray([]);
        this.hiddenInputs = ko.observableArray([]);
    }

    public setWidgetModel(model: FormModel, applyChangesCallback?: () => void): void {
        this.formModel = model;
        this.applyChangesCallback = applyChangesCallback;

        this.formAction(model.formAction);
        this.formMethod(model.formMethod || "get");
        this.formTarget(model.formTarget || "_self");
        this.acceptCharset(model.acceptCharset);
        this.encType(model.encType || "application/x-www-form-urlencoded");
        this.isFieldset(model.isFieldset);
        this.legendText(model.legendText);
        this.legendAlign(model.legendAlign || "left");
        this.isInline(model.isInline);

        if(model.widgets && model.widgets.length > 0) {
            const hiddens = model.widgets.filter(widget => widget.inputType === "hidden");
            if (hiddens.length > 0) {
                this.hiddenInputs(
                    hiddens.map<OptionItem>(input => {
                        return { itemName: <string>input.getInputProperty("inputName").propertyValue, itemValue:input.getInputProperty("inputValue").propertyValue };
                    })
                )
            }
            
        }
    }

    public closeEditor(): void {
        this.viewManager.closeWidgetEditor();
    }

    public addItem () {
        if (this.itemNameToAdd() != "" && this.itemValueToAdd() != "" && 
            !this.hiddenInputs().find((item) => item.itemName === this.itemNameToAdd())) {
            
                const newItem = { itemName: this.itemNameToAdd(), itemValue: this.itemValueToAdd()};
                const hiddenInputModel = new InputModel("hidden");
                hiddenInputModel.setProperty("inputName", newItem.itemName);
                hiddenInputModel.setProperty("inputValue", newItem.itemValue);
                this.formModel.widgets.push(hiddenInputModel);
                this.hiddenInputs.push(newItem);
                this.applyChangesCallback();
        }
        this.itemNameToAdd("");
        this.itemValueToAdd("");
    }

    public deleteItem() {
        if (this.selectedItems().length > 0)
        {
            const removed = this.hiddenInputs.remove((item) => this.selectedItems().findIndex(selectedName => selectedName === item.itemName) !== -1);
            removed.map(item => {
                const modelToRemove = this.formModel.widgets.find(hidden => item.itemName === hidden.getInputProperty("inputName").propertyValue);
                this.formModel.widgets.remove(modelToRemove);
            });
            this.applyChangesCallback();
            this.selectedItems([]);
        }
    }
}
