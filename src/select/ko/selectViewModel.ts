import * as ko from "knockout";
import template from "./select.html";
import { Component } from "@paperbits/core/ko/component";

@Component({
    selector: "paperbits-select",
    template: template
})
export class SelectViewModel {
    public labelFor: KnockoutObservable<string>;
    public showLabel: KnockoutObservable<string>;   //"before" | "after | "none"
    public labelText: KnockoutObservable<string>;
    public selectName: KnockoutObservable<string>;
    public textValue?: KnockoutObservable<string>;
    public sizeCount?: KnockoutObservable<number>;
    public isMultiple?: KnockoutObservable<boolean>;
    public isRequired?: KnockoutObservable<boolean>;
    public isDisabled?: KnockoutObservable<boolean>;
    public optionsList: KnockoutObservableArray<string>;
    public defaultText?: KnockoutObservable<string>;

    constructor() {
        this.labelFor = ko.observable<string>();
        this.showLabel = ko.observable<string>("none");

        this.labelText = ko.observable<string>();
        this.selectName = ko.observable<string>();
        this.textValue = ko.observable<string>();
        this.sizeCount = ko.observable<number>();
        this.isMultiple = ko.observable<boolean>();
        this.isRequired = ko.observable<boolean>();
        this.isDisabled = ko.observable<boolean>();
        
        this.optionsList = ko.observableArray<string>([]);
        this.defaultText = ko.observable<string>("Please choose an option");
    }
}