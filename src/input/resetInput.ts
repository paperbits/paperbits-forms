import { InputModel } from "./inputModel";

export class ResetInputModel extends InputModel {
    constructor() {
        super("reset");

        this.properties.push({ propertyName: "inputValue", propertyValue: undefined });
    }
}