import * as ko from "knockout";
import { InputModel, InputType, OptionItem, InputProperty } from "../inputModel";

export class InputWidgetHandler {
    constructor() {
        ko.bindingHandlers.inputWidget = {
            init(element: HTMLElement, valueAccessor) {
                const inputData = valueAccessor();
                const inputModel = inputData.controlModel;
                
                let builder = new InputBuilder(inputModel);
                builder.setControlHtml(element);
                // element.innerHTML = builder.getControlHtml();

                inputData.changed.subscribe(() => {
                    // element.innerHTML = builder.getControlHtml();
                    builder.setControlHtml(element);
                });
            }
        };
    }
}

class InputBuilder {
    public inputElement: HTMLInputElement;

    constructor(public inputModel: InputModel) {}

    private inputPropertyMap = {
        "inputId": "id",
        "inputName": "name",
        "placeholderText": "placeholder",
        "inputValue": "value",
        "maxLength" : "maxLength",
        "minValue"  : "min",
        "maxValue"  : "max",
        "sizeValue" : "size",
        "stepValue" : "step",
        "isRequired": "required",
        "isReadonly": "readOnly",
        "isDisabled": "disabled",
        "isChecked" : "checked",
        "patternRegexp": "pattern",
        "accept": "accept",
        "isMultiple": "multiple"
    }

    // private buildInputProperties() {
    //     if (this.inputModel.inputProperties.length > 0) {
    //         for (let i = 0; i < this.inputModel.inputProperties.length; i++) {
    //             const inputProperty = this.inputModel.inputProperties[i];
    //             if (inputProperty.propertyValue) {
    //                 let attrName = this.inputPropertyMap[inputProperty.propertyName];
    //                 attrName && this.inputElement.setAttribute(attrName, inputProperty.propertyValue);
    //             }
    //         }
    //     }
    // }

    public getProperty(propertyName: string) : any {
        let inputProperty = this.inputModel.getInputProperty(propertyName);
        if(inputProperty) {
            return inputProperty.propertyValue;
        }
        return "";
    }

    public getInput(container: HTMLElement, inputType: InputType, attributes: InputProperty[], label: string, help: string) {
        let inputElement = <HTMLInputElement>document.createElement("input");
        inputElement.type = inputType;
        inputElement.classList.add(inputType === "range" ? "form-control-range" : "form-control");
        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i++) {
                const attrib = attributes[i];
                if (attrib.propertyValue) {
                    let attrName = this.inputPropertyMap[attrib.propertyName];
                    attrName && inputElement.setAttribute(attrName, attrib.propertyValue);
                }
            }
        }
        const controlId: string = inputElement.id;
        if (help) {
            inputElement.setAttribute("aria-describedby", `${controlId}Help`);
        }
        let _for = controlId && `for="${controlId}"`;
        let _id = controlId && `id="${controlId}Help"`;

        container.classList.add("form-group");
        container.innerHTML = `${!!label ? `<label ${_for}>${label}</label>` : ""}
                ${inputElement.outerHTML.trim()}
                ${!!help ? `<small ${_id} class="form-text text-muted">${help}</small>` : ""}`;
    }

    public getCheckbox(container: HTMLElement, showLabel: string, controlId: string, label: string, name: string, value: string, isRequired: boolean, isChecked?: boolean, isInline?: boolean) {
        let inline = isInline ? " form-check-inline" : "";
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _checked = isChecked ? "checked" : "";
        let _required = isRequired ? "required" : "";
        let _value = value ? `value="${value}"` : "";

        container.classList.add("form-check");
        if (isInline) {
            container.classList.add("form-check-inline");
        } else {
            container.classList.remove("form-check-inline");
        }
        container.innerHTML = `${(label && showLabel === "before") ? `<label class="form-check-label" ${_for}>${label}</label>` : ""}
                <input class="form-check-input" type="checkbox" name="${name}" ${_id} ${_value} ${_checked} ${_required}>
                ${(label && showLabel === "after")  ? `<label class="form-check-label" ${_for}>${label}</label>` : ""}`;
    }

    public getRadio(container: HTMLElement, optionItems: OptionItem[], controlId: string, name: string, isRequired: boolean, isChecked?: boolean, isInline?: boolean) {
        let result = "";
        let inline = isInline ? " form-check-inline" : "";
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _checked = isChecked ? "checked" : "";
        let _required = isRequired ? "required" : "";

        for (let i = 0; i < optionItems.length; i++) {
            const item = optionItems[i];
            result += `\n<div class="form-check${inline}">
            <input class="form-check-input" type="radio" name="${name}" ${_id} value="${item.itemValue}" ${_checked} ${_required}>
            <label class="form-check-label" ${_for}>${item.itemName}</label>
            </div>`
        }

        container.innerHTML = result;
    }

    public getSubmit(container: HTMLElement, controlId: string, name: string, value: string, label: string) {
        let _id = controlId ? `id="${controlId}"` : "";
        let _value = value ? `value="${value}"` : "";
        let _name = name ? `name="${name}"` : "";
        container.innerHTML = `<button type="submit" ${_id} ${_name} ${_value} class="btn btn-primary">${label || "Submit"}</button>`;
    }

    public getSelect(container: HTMLElement, controlId: string, label: string, name: string, optionItems: OptionItem[], placeholder: string, isRequired: boolean, size?: string, isMultiple?: boolean) {
        let options = !!placeholder ? `<option value=''>${placeholder}</option>` : "";
        for (let i = 0; i < optionItems.length; i++) {
            const item = optionItems[i];
            options += `/n<option value="${item.itemValue || item.itemName}">${item.itemName || item.itemValue}</option>`;
        }
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _required = isRequired ? "required" : "";
        let _isMultiple = isMultiple ? "multiple" : "";
        let _size = size ? `size="${size}"` : "";
        container.classList.add("form-group");
        container.innerHTML = 
                `${!!label ? `<label ${_for}>${label}</label>` : ""}
                <select class="form-control" ${_id} name="${name}" ${_size} ${_isMultiple} ${_required}>
                    ${options}
                </select>`;
    }

    public getTextarea(container: HTMLElement, controlId: string, label: string, name: string, textValue: string, isRequired: boolean, rows?: string, cols?: string, maxLength?: string, placeholder?: string) {
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _required = isRequired ? "required" : "";
        let _rows = rows ? `rows="${rows}"` : "";
        let _cols = cols ? `cols="${cols}"` : "";
        let _maxlength = maxLength ? `maxlength="${maxLength}"` : "";
        let _placeholder = placeholder ? `placeholder="${placeholder}"` : "";
        container.classList.add("form-group");
        container.innerHTML = 
                `${!!label ? `<label ${_for}>${label}</label>` : ""}
                <textarea class="form-control" ${_id} name="${name}" ${_rows} ${_cols} ${_required} ${_maxlength} ${_placeholder}>${textValue}</textarea>`;
    }

    public setControlHtml(container: HTMLElement) {
        let showLabel: string = this.getProperty("showLabel");
        let controlId: string = this.getProperty("inputId"); 
        let label: string = this.getProperty("labelText");
        let name: string = this.getProperty("inputName");
        let value: string = this.getProperty("inputValue");
        let isChecked: boolean = this.getProperty("isChecked");
        let isRequired: boolean = this.getProperty("isRequired"); 
        let isInline: boolean = this.getProperty("isInline");
        
        let help: string = this.getProperty("help");
        let placeholder: string = this.getProperty("placeholderText");
        let size: string = this.getProperty("sizeValue");
        let rows: string = this.getProperty("rowsCount");
        let cols: string = this.getProperty("colsCount");
        let isMultiple: boolean = this.getProperty("isMultiple");
        let textValue: string = this.getProperty("textValue");
        let maxLength: string = this.getProperty("maxLength");

        let formGroup = "";

        switch (this.inputModel.inputType) {
            case "radio":
                this.getRadio(container, this.inputModel.options, controlId, name, isRequired, isChecked, isInline);
                break;
            case "checkbox":
                this.getCheckbox(container, showLabel, controlId, label, name, value, isRequired, isChecked, isInline);
                break;
            case "submit": 
                this.getSubmit(container, controlId, name, value, label);
                break;
            case "select": 
                this.getSelect(container, controlId, label, name, this.inputModel.options, placeholder, isRequired, size, isMultiple);
                break;
            case "textarea": 
                this.getTextarea(container, controlId, label, name, textValue, isRequired, rows, cols, maxLength, placeholder);
                break;
            default: 
                this.getInput(container, this.inputModel.inputType, this.inputModel.inputProperties, label, help);
        }
        return formGroup;
    }
}