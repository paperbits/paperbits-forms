import * as ko from "knockout";
import template from "./formEditor.html";
import { IViewManager } from '@paperbits/common/ui';
import { IWidgetEditor } from '@paperbits/common/widgets';
import { Component } from "@paperbits/knockout/decorators/component";
import { FormModel } from "../../models";


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
    public readonly formName?:KnockoutObservable<string>;
    public readonly isFieldset?:KnockoutObservable<boolean>;
    public readonly legendText?:KnockoutObservable<string>;
    public readonly legendAlign?:KnockoutObservable<string>;
    public readonly description?:KnockoutObservable<string>;

    constructor(private viewManager: IViewManager) {
        this.formAction    = ko.observable<string>();
        this.formMethod    = ko.observable<string>();
        this.formTarget    = ko.observable<string>();
        this.acceptCharset = ko.observable<string>();
        this.encType       = ko.observable<string>();
        this.formName      = ko.observable<string>();
        this.isFieldset    = ko.observable<boolean>();
        this.legendText    = ko.observable<string>();
        this.legendAlign   = ko.observable<string>();
        this.description   = ko.observable<string>();

        this.setWidgetModel = this.setWidgetModel.bind(this);

        this.formAction   .subscribe(((newValue) => {this.formModel.formAction    = newValue;this.applyChangesCallback();}).bind(this));  
        this.formMethod   .subscribe(((newValue) => {this.formModel.formMethod    = newValue;this.applyChangesCallback();}).bind(this));
        this.formTarget   .subscribe(((newValue) => {this.formModel.formTarget    = newValue;this.applyChangesCallback();}).bind(this));
        this.acceptCharset.subscribe(((newValue) => {this.formModel.acceptCharset = newValue;this.applyChangesCallback();}).bind(this));
        this.encType      .subscribe(((newValue) => {this.formModel.encType       = newValue;this.applyChangesCallback();}).bind(this));
        this.formName     .subscribe(((newValue) => {this.formModel.formName      = newValue;this.applyChangesCallback();}).bind(this));
        this.isFieldset   .subscribe(((newValue) => {this.formModel.isFieldset    = newValue;this.applyChangesCallback();}).bind(this));
        this.legendText   .subscribe(((newValue) => {this.formModel.legendText    = newValue;this.applyChangesCallback();}).bind(this));
        this.legendAlign  .subscribe(((newValue) => {this.formModel.legendAlign   = newValue;this.applyChangesCallback();}).bind(this));
        this.description  .subscribe(((newValue) => {this.formModel.description   = newValue;this.applyChangesCallback();}).bind(this));
    }

    public setWidgetModel(model: FormModel, applyChangesCallback?: () => void): void {
        this.formModel = model;
        this.applyChangesCallback = applyChangesCallback;

        this.formAction(model.formAction);
        this.formMethod(model.formMethod || "get");
        this.formTarget(model.formTarget || "_self");
        this.acceptCharset(model.acceptCharset);
        this.encType(model.encType || "application/x-www-form-urlencoded");
        this.formName(model.formName);
        this.isFieldset(model.isFieldset);
        this.legendText(model.legendText);
        this.legendAlign(model.legendAlign || "left");
        this.description(model.description);
    }

    public closeEditor(): void {
        this.viewManager.closeWidgetEditor();
    }
}
