import * as ko from "knockout";
import template from "./textInput.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "paperbits-textInput",
    template: template
})
export class TextInput {
    public readonly label: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly placeholder: ko.Observable<string>;
    public readonly styles: ko.Observable<StyleModel>;

    constructor() {
        this.label = ko.observable<string>("Text input");
        this.value = ko.observable<string>();
        this.placeholder = ko.observable<string>("Text input");
        this.styles = ko.observable<StyleModel>();
    }
}