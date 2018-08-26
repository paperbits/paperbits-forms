import { InputModel } from "./inputModel";

export class TimeInputModel extends InputModel {
    constructor() {
        super("time");

        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "inputValue", propertyValue: "" });
        this.properties.push({ propertyName: "minValue", propertyValue: undefined });
        this.properties.push({ propertyName: "maxValue", propertyValue: undefined });
        this.properties.push({ propertyName: "stepValue", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.properties.push({ propertyName: "isReadonly", propertyValue: undefined });
    }
}