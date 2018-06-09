import * as ko from "knockout";
import template from "./form.html";
import { Component } from "@paperbits/knockout/decorators/component";

@Component({
    selector: "paperbits-form",
    template: template
})
export class FormViewModel {
    public widgets: KnockoutObservableArray<Object>;
    public formAction:KnockoutObservable<string>;
    public formMethod?:KnockoutObservable<string>;
    public formTarget?:KnockoutObservable<string>;
    public acceptCharset?:KnockoutObservable<string>;
    public encType?:KnockoutObservable<string>;
    public formName?:KnockoutObservable<string>;
    public isFieldset?:KnockoutObservable<boolean>;
    public legendText?:KnockoutObservable<string>;
    public legendAlign?:KnockoutObservable<string>;
    public description?:KnockoutObservable<string>;
    public isInline?: KnockoutObservable<boolean>;

    constructor() {
        this.widgets = ko.observableArray<Object>();

        this.formAction = ko.observable<string>();
        this.formMethod = ko.observable<string>();
        this.formTarget = ko.observable<string>();
        this.acceptCharset = ko.observable<string>();
        this.encType = ko.observable<string>();
        this.formName = ko.observable<string>();
        this.isFieldset = ko.observable<boolean>();
        this.legendText = ko.observable<string>();
        this.legendAlign = ko.observable<string>();
        this.description = ko.observable<string>();
        this.isInline = ko.observable<boolean>();
    }
}