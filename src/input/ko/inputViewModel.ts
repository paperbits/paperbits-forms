import * as ko from "knockout";
import template from "./input.html";
import { Component } from "@paperbits/core/ko/component";

@Component({
    selector: "paperbits-input",
    template: template
})
export class InputViewModel {
    public labelFor: KnockoutObservable<string>;
    public showLabel: KnockoutObservable<string>;   //"before" | "after" | "none"
    public labelText: KnockoutObservable<string>;

    public inputType: KnockoutObservable<string>;   //"text" | "password" | "submit" | "reset" | "radio" | "checkbox" | "button" | 
    //"color" | "date" | "email" | "number" | "range" | "search" | "time" | "url"
    public inputName: KnockoutObservable<string>;
    public placeholderText?: KnockoutObservable<string>;
    public inputValue?: KnockoutObservable<string | number>;
    public maxLength?: KnockoutObservable<number>;
    public minValue?: KnockoutObservable<number>;
    public maxValue?: KnockoutObservable<number>;
    public sizeValue?: KnockoutObservable<number>;
    public stepValue?: KnockoutObservable<number>;
    public isRequired?: KnockoutObservable<boolean>;
    public isReadonly?: KnockoutObservable<boolean>;
    public isDisabled?: KnockoutObservable<boolean>;
    public isChecked?: KnockoutObservable<boolean>;
    public patternRegexp?: KnockoutObservable<string>;
    public accept?: KnockoutObservable<string>;
    public isInline?: KnockoutObservable<boolean>;

    public inputTypeClass: KnockoutObservable<string>;
    public labelTypeClass: KnockoutObservable<string>;
    public divTypeClass: KnockoutObservable<string>;

    constructor() {
        this.labelFor = ko.observable<string>();
        this.showLabel = ko.observable<string>("none");
        this.labelText = ko.observable<string>();
        this.inputType = ko.observable<string>();
        this.inputName = ko.observable<string>();
        this.placeholderText = ko.observable<string>();
        this.inputValue = ko.observable<string | number>();

        this.maxLength = ko.observable<number>();
        this.minValue = ko.observable<number>();
        this.maxValue = ko.observable<number>();
        this.sizeValue = ko.observable<number>();
        this.stepValue = ko.observable<number>();
        this.isRequired = ko.observable<boolean>();
        this.isReadonly = ko.observable<boolean>();
        this.isDisabled = ko.observable<boolean>();
        this.isChecked = ko.observable<boolean>();
        this.patternRegexp = ko.observable<string>();
        this.accept = ko.observable<string>();
        this.isInline = ko.observable<boolean>();

        this.inputTypeClass = ko.pureComputed(this.getInputClass, this);
        this.labelTypeClass = ko.pureComputed(this.getLabelClass, this);
        this.divTypeClass = ko.pureComputed(this.getDivClass, this);
    }

    public getLabelClass() {
        switch (this.inputType()) {
            case "radio":
            case "checkbox": return "form-check-label";
        }
    }

    public getInputClass() {
        switch (this.inputType()) {
            case "radio":
            case "checkbox": return "form-check-input";
            case "range": return "form-control-range";
            case "submit": return "btn btn-primary";
            default: return "form-control";
        }
    }

    public getDivClass() {
        switch (this.inputType()) {
            case "radio":
            case "checkbox":
                return this.isInline() ? "form-group form-check-inline" : "form-group form-check";
            case "submit":
                return "";
            default: return "form-group";
        }
    }
}