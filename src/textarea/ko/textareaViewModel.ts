import * as ko from "knockout";
import template from "./textarea.html";
import { Component } from "@paperbits/knockout/decorators/component";

@Component({
    selector: "paperbits-textarea",
    template: template
})
export class TextareaViewModel {
    public labelFor: KnockoutObservable<string>;
    public showLabel: KnockoutObservable<string>;   //"before" | "after"
    public labelText: KnockoutObservable<string>;

    public textareaName:KnockoutObservable<string>;
    public placeholderText?: KnockoutObservable<string>;
    public textValue?: KnockoutObservable<string>;
    public colsCount?: KnockoutObservable<number>;
    public rowsCount?: KnockoutObservable<number>;
    public maxLength?: KnockoutObservable<number>;
    public isRequired?: KnockoutObservable<boolean>;
    public isReadonly?: KnockoutObservable<boolean>;
    public isDisabled?: KnockoutObservable<boolean>;

    constructor() {
        this.labelFor = ko.observable<string>();
        this.showLabel = ko.observable<string>("none");
        this.labelText = ko.observable<string>();

        this.textareaName = ko.observable<string>();
        this.placeholderText = ko.observable<string>();
        this.textValue = ko.observable<string>();
        this.colsCount = ko.observable<number>();
        this.rowsCount = ko.observable<number>();
        this.maxLength = ko.observable<number>();
        this.isRequired = ko.observable<boolean>();
        this.isReadonly = ko.observable<boolean>();
        this.isDisabled = ko.observable<boolean>();
    }
}