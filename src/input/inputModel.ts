export type InputType = "textarea" | "select" | "text" | "password" | "submit" | "reset" | "hidden" | "radio" | "checkbox" | "color" | "date" | "email" | "number" | "range" | "search" | "time" | "url";
export class InputModel {
    public inputProperties: InputProperty[];
    public options?: OptionItem[];

    constructor(public inputType: InputType) {
        this.inputProperties = [];
        //this.inputProperties.push( {propertyName: "inputId", propertyValue: ""});
        this.inputProperties.push( {propertyName: "inputName", propertyValue: ""});

        switch (inputType) {
            case "text":
                this.inputProperties.push( {propertyName: "placeholderText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "help", propertyValue: ""});
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "maxLength", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isReadonly", propertyValue: undefined});
                break;
            case "color":
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isReadonly", propertyValue: undefined});
                break;
            case "submit":
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: undefined});
                //this.inputProperties.push( {propertyName: "isDisabled", propertyValue: undefined});
                break;
            case "reset":
            case "hidden":
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: undefined});
                break;
            case "date":
            case "time":
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "minValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "maxValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "stepValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isReadonly", propertyValue: undefined});
                break;
            case "email":
            case "password":
            case "search":
            case "url":
                this.inputProperties.push( {propertyName: "placeholderText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "maxLength", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "patternRegexp", propertyValue: ""});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isReadonly", propertyValue: undefined});
                break;
            case "range":
            case "number":
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "maxLength", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "minValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "maxValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "stepValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isReadonly", propertyValue: undefined});
                break;
            case "radio":
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "isInline", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isChecked", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                //this.inputProperties.push( {propertyName: "isDisabled", propertyValue: undefined});
                this.options = [];
                break;
            case "checkbox":
                this.inputProperties.push( {propertyName: "showLabel", propertyValue: "after"});
                this.inputProperties.push( {propertyName: "labelText", propertyValue: "First option"});
                this.inputProperties.push( {propertyName: "isInline", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isChecked", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                //this.inputProperties.push( {propertyName: "isDisabled", propertyValue: undefined});
                break;
            case "select":
                this.inputProperties.push( {propertyName: "placeholderText", propertyValue: "Please select item"});
                this.inputProperties.push( {propertyName: "inputValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "sizeValue", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                //this.inputProperties.push( {propertyName: "isDisabled", propertyValue: undefined});
                this.options = [];
                break;
            case "textarea":
                this.inputProperties.push( {propertyName: "placeholderText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "textValue", propertyValue: ""});
                this.inputProperties.push( {propertyName: "labelText", propertyValue: ""});
                this.inputProperties.push( {propertyName: "colsCount", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "rowsCount", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "maxLength", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isRequired", propertyValue: undefined});
                this.inputProperties.push( {propertyName: "isReadonly", propertyValue: undefined});
                //this.inputProperties.push( {propertyName: "isDisabled", propertyValue: undefined});
                break;
        }
    }

    public getInputProperty = (propertyName: string) => this.inputProperties.find((item) => item.propertyName === propertyName);

    public setProperty(propertyName: string, propertyValue: any) {
        if (!propertyName) {
            return;
        }
        const propertyItem = this.getInputProperty(propertyName);                
        if (propertyItem) {
            propertyItem.propertyValue = propertyValue;
        } else {
            this.inputProperties.push({
                propertyName: propertyName,
                propertyValue: propertyValue
            });
        }
    }
}

export class InputProperty {
    public propertyName: string;
    public propertyValue: any;
}
export class OptionItem {
    public itemName: string;
    public itemValue: any;
}