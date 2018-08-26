import { InputModel } from "./inputModel";

export class SelectInputModel extends InputModel {
    constructor() {
        super("select");

        this.properties.push({ propertyName: "placeholderText", propertyValue: "Please select item" });
        this.properties.push({ propertyName: "inputValue", propertyValue: "" });
        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "sizeValue", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.options = [
            { itemName: "First option", itemValue: "optionFirst" },
            { itemName: "Second option", itemValue: "optionSecond" },
            { itemName: "Third option", itemValue: "optionThird" }
        ];
    }
}