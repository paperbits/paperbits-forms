import * as ko from "knockout";
import template from "./textareaEditor.html";
import { IViewManager } from '@paperbits/common/ui';
import { IWidgetEditor } from '@paperbits/common/widgets';
import { Component } from "@paperbits/knockout/decorators/component";
import { TextareaModel } from "../textareaModel";

@Component({
    selector: "textarea-editor",
    template: template,
    injectable: "textareaEditor"
})
export class TextareaEditor implements IWidgetEditor {
    private model: TextareaModel;
    private applyChangesCallback: () => void;

    public readonly labelFor: KnockoutObservable<string>;
    public readonly showLabel: KnockoutObservable<string>;   //"before" | "after | "none"
    public readonly labelText: KnockoutObservable<string>;
    public readonly textareaName:KnockoutObservable<string>;
    public readonly placeholderText?: KnockoutObservable<string>;
    public readonly textValue?: KnockoutObservable<string>;
    public readonly colsCount?: KnockoutObservable<number>;
    public readonly rowsCount?: KnockoutObservable<number>;
    public readonly maxLength?: KnockoutObservable<number>;
    public readonly isRequired?: KnockoutObservable<boolean>;
    public readonly isReadonly?: KnockoutObservable<boolean>;
    public readonly isDisabled?: KnockoutObservable<boolean>;

    constructor(private viewManager: IViewManager) {
        this.labelFor        = ko.observable<string>();
        this.showLabel       = ko.observable<string>();
        this.textareaName    = ko.observable<string>();
        this.labelText       = ko.observable<string>();
        this.placeholderText = ko.observable<string>();
        this.textValue       = ko.observable<string>();
        this.colsCount       = ko.observable<number>();
        this.rowsCount       = ko.observable<number>();
        this.maxLength       = ko.observable<number>();
        this.isRequired      = ko.observable<boolean>();
        this.isReadonly      = ko.observable<boolean>();
        this.isDisabled      = ko.observable<boolean>();

        this.labelFor       .subscribe(((newValue) => {this.model.textareaId     = newValue;this.applyChangesCallback();}).bind(this));
        this.showLabel      .subscribe(((newValue) => {this.model.showLabel      = newValue;this.applyChangesCallback();}).bind(this));
        this.labelText      .subscribe(((newValue) => {this.model.labelText      = newValue;this.applyChangesCallback();}).bind(this));
        this.textareaName   .subscribe(((newValue) => {this.model.textareaName   = newValue;this.applyChangesCallback();}).bind(this));
        this.placeholderText.subscribe(((newValue) => {this.model.placeholderText= newValue;this.applyChangesCallback();}).bind(this));
        this.textValue      .subscribe(((newValue) => {this.model.textValue      = newValue;this.applyChangesCallback();}).bind(this));
        this.colsCount      .subscribe(((newValue) => {this.model.colsCount      = newValue;this.applyChangesCallback();}).bind(this));
        this.rowsCount      .subscribe(((newValue) => {this.model.rowsCount      = newValue;this.applyChangesCallback();}).bind(this));
        this.maxLength      .subscribe(((newValue) => {this.model.maxLength      = newValue;this.applyChangesCallback();}).bind(this));
        this.isRequired     .subscribe(((newValue) => {this.model.isRequired     = newValue;this.applyChangesCallback();}).bind(this));
        this.isReadonly     .subscribe(((newValue) => {this.model.isReadonly     = newValue;this.applyChangesCallback();}).bind(this));
        this.isDisabled     .subscribe(((newValue) => {this.model.isDisabled     = newValue;this.applyChangesCallback();}).bind(this));
    }

    public setWidgetModel(model: TextareaModel, applyChangesCallback?: () => void): void {
        this.model = model;
        this.applyChangesCallback = applyChangesCallback;

        this.labelFor(model.textareaId);
        this.labelText(model.labelText);
        this.showLabel(model.showLabel || "none");
        this.textareaName(model.textareaName);
        this.placeholderText(model.placeholderText);
        this.textValue(model.textValue);
        this.colsCount(model.colsCount);
        this.rowsCount(model.rowsCount);
        this.maxLength(model.maxLength);       
        this.isRequired(model.isRequired);
        this.isReadonly(model.isReadonly);
        this.isDisabled(model.isDisabled);
    }

    public closeEditor(): void {
        this.viewManager.closeWidgetEditor();
    }
}