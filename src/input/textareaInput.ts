import { InputModel } from "./inputModel";

export class TextareaInputModel extends InputModel {
    constructor() {
        super("textarea");

        this.properties.push({ propertyName: "placeholderText", propertyValue: "" });
        this.properties.push({ propertyName: "textValue", propertyValue: "" });
        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "colsCount", propertyValue: undefined });
        this.properties.push({ propertyName: "rowsCount", propertyValue: undefined });
        this.properties.push({ propertyName: "maxLength", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.properties.push({ propertyName: "isReadonly", propertyValue: undefined });
    }
}