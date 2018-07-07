import * as ko from "knockout";
import template from "./input.html";
import { Component } from "@paperbits/core/ko/component";
import { InputModel } from "../inputModel";

@Component({
    selector: "paperbits-input",
    template: template
})
export class InputViewModel {

    public inputData;
    
    constructor(inputModel: InputModel) {
        this.inputData = {
            changed: ko.observable(),
            controlModel: inputModel
        }
    }
}