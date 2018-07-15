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

                inputData.changed.subscribe(() => {
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

    public setInput(container: HTMLElement, inputType: InputType, attributes: InputProperty[], label: string, help: string) {
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

    public setCheckbox(container: HTMLElement, showLabel: string, controlId: string, label: string, name: string, value: string, isRequired: boolean, 
                       isChecked: boolean, isInline: boolean, isDisabled:boolean) {
        let inline = isInline ? " form-check-inline" : "";
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _checked = isChecked ? "checked" : "";
        let _required = isRequired ? "required" : "";
        let _value = value ? `value="${value}"` : "";
        let _isDisabled = isDisabled ? "disabled" : "";

        container.classList.add("form-check");
        if (isInline) {
            container.classList.add("form-check-inline");
        } else {
            container.classList.remove("form-check-inline");
        }
        container.innerHTML = `${(label && showLabel === "before") ? `<label class="form-check-label" ${_for}>${label}</label>` : ""}
                <input class="form-check-input" type="checkbox" name="${name}" ${_id} ${_value} ${_checked} ${_isDisabled} ${_required}>
                ${(label && showLabel === "after")  ? `<label class="form-check-label" ${_for}>${label}</label>` : ""}`;
    }

    public setRadio(container: HTMLElement, optionItems: OptionItem[], controlId: string, name: string, value: string, isRequired: boolean, 
                    isInline: boolean, isDisabled:boolean) {
        let result = "";
        let inline = isInline ? " form-check-inline" : "";
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _required = isRequired ? "required" : "";
        let _isDisabled = isDisabled ? "disabled" : "";

        for (let i = 0; i < optionItems.length; i++) {
            const item = optionItems[i];
            const _checked = value && item.itemValue === value ? "checked" : "";
            result += `\n<div class="form-check${inline}">
            <input class="form-check-input" type="radio" name="${name}" ${_id} value="${item.itemValue}" ${_checked} ${_isDisabled} ${_required}>
            <label class="form-check-label" ${_for}>${item.itemName}</label>
            </div>`
        }

        container.innerHTML = result;
    }

    public setSubmit(container: HTMLElement, controlId: string, name: string, value: string, label: string, isDisabled:boolean) {
        let _id = controlId ? `id="${controlId}"` : "";
        let _value = value ? `value="${value}"` : "";
        let _name = name ? `name="${name}"` : "";
        let _isDisabled = isDisabled ? "disabled" : "";
        container.innerHTML = `<button type="submit" ${_id} ${_name} ${_value} ${_isDisabled} class="btn btn-primary">${label || "Submit"}</button>`;
    }

    public setHidden(container: HTMLElement, controlId: string, name: string, value: string) {
        let _id = controlId ? `id="${controlId}"` : "";
        let _value = value ? `value="${value}"` : "";
        let _name = name ? `name="${name}"` : "";
        container.innerHTML = `<input type="hidden" ${_id} ${_name} ${_value}>`;
    }

    public setReset(container: HTMLElement, value: string) {
        let _value = value ? `value="${value}"` : "";
        container.innerHTML = `<input type="reset" ${_value} class="btn btn-primary">`;
    }

    public setSelect(container: HTMLElement, controlId: string, label: string, name: string, value: string, optionItems: OptionItem[], placeholder: string, isRequired: boolean, 
                     size: string, isMultiple: boolean, isDisabled:boolean) {
        let options = !!placeholder ? `<option selected disabled>${placeholder}</option>` : "";
        for (let i = 0; i < optionItems.length; i++) {
            const item = optionItems[i];
            const selected = value && item.itemValue === value ? "selected" : "";
            options += `/n<option value="${item.itemValue || item.itemName}" ${selected}>${item.itemName || item.itemValue}</option>`;
        }
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _required = isRequired ? "required" : "";
        let _isMultiple = isMultiple ? "multiple" : "";
        let _size = size ? `size="${size}"` : "";
        let _isDisabled = isDisabled ? "disabled" : "";
        container.classList.add("form-group");
        container.innerHTML = 
                `${!!label ? `<label ${_for}>${label}</label>` : ""}
                <select class="form-control" ${_id} name="${name}" ${_size} ${_isMultiple} ${_required} ${_isDisabled}>
                    ${options}
                </select>`;
    }

    public setTextarea(container: HTMLElement, controlId: string, label: string, name: string, textValue: string, isRequired: boolean, 
                       rows: string, cols: string, maxLength: string, placeholder: string, isDisabled:boolean, isReadonly: boolean) {
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        let _required = isRequired ? "required" : "";
        let _rows = rows ? `rows="${rows}"` : "";
        let _cols = cols ? `cols="${cols}"` : "";
        let _maxlength = maxLength ? `maxlength="${maxLength}"` : "";
        let _placeholder = placeholder ? `placeholder="${placeholder}"` : "";
        let _isDisabled = isDisabled ? "disabled" : "";
        let _isReadonly = isReadonly ? "readonly" : "";
        container.classList.add("form-group");
        container.innerHTML = 
                `${!!label ? `<label ${_for}>${label}</label>` : ""}
                <textarea class="form-control" ${_id} name="${name}" ${_rows} ${_cols} ${_required} ${_maxlength} ${_placeholder} ${_isDisabled} ${_isReadonly}>${textValue}</textarea>`;
    }

    public setControlHtml(container: HTMLElement) {
        let showLabel: string = this.getProperty("showLabel");
        let controlId: string = this.getProperty("inputId"); 
        let label: string = this.getProperty("labelText");
        let name: string = this.getProperty("inputName");
        let value: string = this.getProperty("inputValue");
        let isChecked: boolean = this.getProperty("isChecked");
        let isRequired: boolean = this.getProperty("isRequired"); 
        let isReadonly: boolean = this.getProperty("isReadonly"); 
        let isDisabled: boolean = this.getProperty("isDisabled"); 
        let isInline: boolean = this.getProperty("isInline");
        
        let help: string = this.getProperty("help");
        let placeholder: string = this.getProperty("placeholderText");
        let size: string = this.getProperty("sizeValue");
        let rows: string = this.getProperty("rowsCount");
        let cols: string = this.getProperty("colsCount");
        let isMultiple: boolean = this.getProperty("isMultiple");
        let textValue: string = this.getProperty("textValue");
        let maxLength: string = this.getProperty("maxLength");

        switch (this.inputModel.inputType) {
            case "radio":
                this.setRadio(container, this.inputModel.options, controlId, name, value, isRequired, isInline, isDisabled);
                break;
            case "checkbox":
                this.setCheckbox(container, showLabel, controlId, label, name, value, isRequired, isChecked, isInline, isDisabled);
                break;
            case "submit": 
                this.setSubmit(container, controlId, name, value, label, isDisabled);
                break;
            case "reset": 
                this.setReset(container, value);
                break;
            case "select": 
                this.setSelect(container, controlId, label, name, value, this.inputModel.options, placeholder, isRequired, size, isMultiple, isDisabled);
                break;
            case "textarea": 
                this.setTextarea(container, controlId, label, name, textValue, isRequired, rows, cols, maxLength, placeholder, isDisabled, isReadonly);
                break;
            case "hidden": 
                this.setHidden(container, controlId, name, value);
                break;
            default: 
                this.setInput(container, this.inputModel.inputType, this.inputModel.inputProperties, label, help);
        }
    }
}