import * as ko from "knockout";
import template from "./textInput.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "text-input",
    template: template
})
export class TextInput {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly placeholder: ko.Observable<string>;
    public readonly styles: ko.Observable<StyleModel>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly required: ko.Observable<boolean>;
    public readonly maxLength: ko.Observable<number>;
    public readonly invalidFeedback: ko.Observable<string>;

    constructor() {
        this.label = ko.observable<string>("Text input");
        this.name = ko.observable<string>();
        this.value = ko.observable<string>();
        this.placeholder = ko.observable<string>("Text input");
        this.readonly = ko.observable<boolean>();
        this.required = ko.observable<boolean>();
        this.maxLength = ko.observable<number>();
        this.invalidFeedback = ko.observable<string>();
        this.styles = ko.observable<StyleModel>();
    }
}