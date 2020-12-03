import * as ko from "knockout";
import template from "./rangeInput.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "range-input",
    template: template
})
export class RangeInput {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly minValue: ko.Observable<number>;
    public readonly maxValue: ko.Observable<number>;
    public readonly value: ko.Observable<number>;
    public readonly styles: ko.Observable<StyleModel>;
    public readonly readonly: ko.Observable<boolean>;


    constructor() {
        this.label = ko.observable<string>("Range input");
        this.name = ko.observable<string>();
        this.minValue = ko.observable<number>();
        this.maxValue = ko.observable<number>();
        this.value = ko.observable<number>();
        this.readonly = ko.observable<boolean>();
        this.styles = ko.observable<StyleModel>();
    }
}