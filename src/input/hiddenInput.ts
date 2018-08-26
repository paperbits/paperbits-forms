import { InputModel } from "./inputModel";

export class HiddenInputModel extends InputModel {
    constructor() {
        super("hidden");

        this.properties.push({ propertyName: "inputValue", propertyValue: undefined });
    }
}