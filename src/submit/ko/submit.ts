import * as ko from "knockout";
import template from "./submit.html";
import { Component } from "@paperbits/common/ko/decorators";
import { StyleModel } from "@paperbits/common/styles";


@Component({
    selector: "paperbits-submit",
    template: template
})
export class Submit {
    public readonly label: ko.Observable<string>;
    public readonly styles: ko.Observable<StyleModel>;

    constructor() {
        this.label = ko.observable<string>("Submit");
        this.styles = ko.observable<StyleModel>();
    }
}