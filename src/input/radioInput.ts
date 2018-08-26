import { InputModel } from "./inputModel";

export class RadioInputModel extends InputModel {
    constructor() {
        super("radio");

        this.properties.push({ propertyName: "inputValue", propertyValue: null });
        this.properties.push({ propertyName: "isInline", propertyValue: false });
        this.properties.push({ propertyName: "isRequired", propertyValue: false });
        this.options = [
            { itemName: "First option", itemValue: "first" },
            { itemName: "Second option", itemValue: "second" },
            { itemName: "Third option", itemValue: "third" }
        ];
    }
}