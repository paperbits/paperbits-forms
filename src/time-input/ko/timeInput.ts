import * as ko from "knockout";
import template from "./timeInput.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "time-input",
    template: template
})
export class TimeInput {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly placeholder: ko.Observable<string>;
    public readonly styles: ko.Observable<StyleModel>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly required: ko.Observable<boolean>;
    public readonly maxLength: ko.Observable<number>;


    constructor() {
        this.label = ko.observable<string>("Time input");
        this.name = ko.observable<string>();
        this.value = ko.observable<string>();
        this.placeholder = ko.observable<string>("Time input");
        this.readonly = ko.observable<boolean>();
        this.required = ko.observable<boolean>();
        this.maxLength = ko.observable<number>();
        this.styles = ko.observable<StyleModel>();
    }
}