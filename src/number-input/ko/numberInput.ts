import * as ko from "knockout";
import template from "./numberInput.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "number-input",
    template: template
})
export class NumberInput {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<number>;
    public readonly placeholder: ko.Observable<string>;
    public readonly styles: ko.Observable<StyleModel>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly required: ko.Observable<boolean>;
    public readonly min: ko.Observable<number>;
    public readonly max: ko.Observable<number>;

    constructor() {
        this.label = ko.observable<string>("Number input");
        this.name = ko.observable<string>();
        this.value = ko.observable<number>();
        this.placeholder = ko.observable<string>("Number input");
        this.readonly = ko.observable<boolean>();
        this.required = ko.observable<boolean>();
        this.min = ko.observable<number>();
        this.max = ko.observable<number>();
        this.styles = ko.observable<StyleModel>();
    }
}