import { InputModel } from "./inputModel";

export class TextInputModel extends InputModel {
    constructor() {
        super("text");

        this.properties.push({ propertyName: "placeholderText", propertyValue: "" });
        this.properties.push({ propertyName: "help", propertyValue: "" });
        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "maxLength", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.properties.push({ propertyName: "isReadonly", propertyValue: undefined });
    }
}