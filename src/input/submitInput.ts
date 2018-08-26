import { InputModel } from "./inputModel";

export class SubmitInputModel extends InputModel {
    constructor() {
        super("submit");

        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "inputValue", propertyValue: undefined });
    }
}