import * as ko from "knockout";
import template from "./selectInput.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";
import { SelectInputOption } from "./selectInputOption";

@Component({
    selector: "select-input",
    template: template
})
export class SelectInput {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly placeholder: ko.Observable<string>;
    public readonly styles: ko.Observable<StyleModel>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly required: ko.Observable<boolean>;
    public readonly options: ko.ObservableArray<SelectInputOption>;

    constructor() {
        this.label = ko.observable<string>("Select");
        this.name = ko.observable<string>();
        this.value = ko.observable<string>();
        this.placeholder = ko.observable<string>("Select value");
        this.readonly = ko.observable<boolean>();
        this.required = ko.observable<boolean>();
        this.options = ko.observableArray<SelectInputOption>();
        this.styles = ko.observable<StyleModel>();
    }
}