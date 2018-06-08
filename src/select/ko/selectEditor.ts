import * as ko from "knockout";
import template from "./selectEditor.html";
import { IViewManager } from '@paperbits/common/ui';
import { IWidgetEditor } from '@paperbits/common/widgets';
import { Component } from "@paperbits/knockout/decorators/component";
import { SelectModel } from "../selectModel";

@Component({
    selector: "select-editor",
    template: template,
    injectable: "selectEditor"
})
export class SelectEditor implements IWidgetEditor {
    private model: SelectModel;
    private applyChangesCallback: () => void;

    public readonly labelFor: KnockoutObservable<string>;
    public readonly showLabel: KnockoutObservable<string>;   //"before" | "after"
    public readonly labelText: KnockoutObservable<string>;
    public readonly selectName: KnockoutObservable<string>;
    public readonly textValue?: KnockoutObservable<string>;
    public readonly sizeCount?: KnockoutObservable<number>;
    public readonly isMultiple?: KnockoutObservable<boolean>;
    public readonly isRequired?: KnockoutObservable<boolean>;
    public readonly isDisabled?: KnockoutObservable<boolean>;
    public readonly optionsList: KnockoutObservableArray<string>;
    public readonly defaultText?: KnockoutObservable<string>;

    public readonly itemToAdd: KnockoutObservable<string>;
    public readonly selectedItems: KnockoutObservableArray<string>;

    constructor(private viewManager: IViewManager) {
        this.labelFor    = ko.observable<string>();
        this.showLabel   = ko.observable<string>();
        this.labelText   = ko.observable<string>();
        this.selectName  = ko.observable<string>();
        this.textValue   = ko.observable<string>();
        this.sizeCount   = ko.observable<number>();
        this.isMultiple  = ko.observable<boolean>();
        this.isRequired  = ko.observable<boolean>();
        this.isDisabled  = ko.observable<boolean>();        
        this.optionsList = ko.observableArray<string>();
        this.defaultText = ko.observable<string>();

        this.labelFor   .subscribe(((newValue) => {this.model.selectId   = newValue;this.applyChangesCallback();}).bind(this));
        this.showLabel  .subscribe(((newValue) => {this.model.showLabel  = newValue;this.applyChangesCallback();}).bind(this));
        this.labelText  .subscribe(((newValue) => {this.model.labelText  = newValue;this.applyChangesCallback();}).bind(this));
        this.selectName .subscribe(((newValue) => {this.model.selectName = newValue;this.applyChangesCallback();}).bind(this));
        this.textValue  .subscribe(((newValue) => {this.model.textValue  = newValue;this.applyChangesCallback();}).bind(this));
        this.sizeCount  .subscribe(((newValue) => {this.model.sizeCount  = newValue;this.applyChangesCallback();}).bind(this));
        this.isMultiple .subscribe(((newValue) => {this.model.isMultiple = newValue;this.applyChangesCallback();}).bind(this));
        this.isRequired .subscribe(((newValue) => {this.model.isRequired = newValue;this.applyChangesCallback();}).bind(this));
        this.isDisabled .subscribe(((newValue) => {this.model.isDisabled = newValue;this.applyChangesCallback();}).bind(this));
        this.defaultText.subscribe(((newValue) => {this.model.defaultText= newValue;this.applyChangesCallback();}).bind(this));

        this.itemToAdd = ko.observable("");
        this.selectedItems = ko.observableArray([]);
    }

    public setWidgetModel(model: SelectModel, applyChangesCallback?: () => void): void {
        this.model = model;
        this.applyChangesCallback = applyChangesCallback;

        this.labelFor(model.selectId);
        this.showLabel(model.showLabel || "none");
        this.labelText(model.labelText);
        this.selectName(model.selectName);
        this.isRequired(model.isRequired);
        this.isDisabled(model.isDisabled);
        this.textValue(model.textValue);
        this.sizeCount(model.sizeCount);
        this.isMultiple(model.isMultiple);       
        this.optionsList(model.optionsList || []);
        this.defaultText(model.defaultText || "Please choose an option");
    }

    public addItem () {
        if (this.itemToAdd() != "" && this.optionsList.indexOf(this.itemToAdd()) === -1) {
            this.optionsList.push(this.itemToAdd());
            this.applyChangesCallback();
        }
        this.itemToAdd("");
    }
 
    public upItem() {
        const posFirst = this.optionsList.indexOf(this.selectedItems()[0]);
        const posLast = this.optionsList.indexOf(this.selectedItems()[this.selectedItems().length-1]);
        if (posFirst > 0) {
            let array = this.optionsList();
            let moveItem = this.optionsList.splice(posFirst-1, 1);
            this.optionsList.splice(posLast, 0, moveItem[0]);
            this.applyChangesCallback();
        }
    }
 
    public downItem() {
        const posFirst = this.optionsList.indexOf(this.selectedItems()[0]);
        const posLast = this.optionsList.indexOf(this.selectedItems()[this.selectedItems().length-1]);
        if (posLast < this.optionsList().length - 1) {
            let array = this.optionsList();
            let moveItem = this.optionsList.splice(posLast+1, 1);
            this.optionsList.splice(posFirst, 0, moveItem[0]);
            this.applyChangesCallback();
        }
    }
 
    public deleteItem() {
        if (this.selectedItems().length > 0)
        {
            this.optionsList.removeAll(this.selectedItems());
            this.applyChangesCallback();
            this.selectedItems([]);
        }
    }

    public closeEditor(): void {
        this.viewManager.closeWidgetEditor();
    }
}