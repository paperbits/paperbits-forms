import * as ko from "knockout";
import template from "./checkbox.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "checkbox",
    template: template
})
export class Checkbox {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<boolean>;
    public readonly styles: ko.Observable<StyleModel>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly required: ko.Observable<boolean>;


    constructor() {
        this.label = ko.observable<string>("Checkbox");
        this.name = ko.observable<string>();
        this.value = ko.observable<boolean>();
        this.readonly = ko.observable<boolean>();
        this.required = ko.observable<boolean>();
        this.styles = ko.observable<StyleModel>();
    }
}