import { InputModel } from "./inputModel";

export class RangeInputModel extends InputModel {
    constructor() {
        super("range");

        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "inputValue", propertyValue: "" });
        this.properties.push({ propertyName: "maxLength", propertyValue: undefined });
        this.properties.push({ propertyName: "minValue", propertyValue: undefined });
        this.properties.push({ propertyName: "maxValue", propertyValue: undefined });
        this.properties.push({ propertyName: "stepValue", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.properties.push({ propertyName: "isReadonly", propertyValue: undefined });
    }
}