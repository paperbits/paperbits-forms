import * as ko from "knockout";
import { InputModel, OptionItem } from "../inputModel";
import { InputProperty } from "../inputProperty";


export class InputBindingHandler {
    constructor() {
        ko.bindingHandlers.inputWidget = {
            init: (element: HTMLElement, valueAccessor) => {
                const inputData = valueAccessor();
                const inputModel = inputData.controlModel;

                const builder = new InputBuilder(inputModel);
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

    constructor(public inputModel: InputModel) { }

    private inputPropertyMap = {
        inputId: "id",
        inputName: "name",
        placeholderText: "placeholder",
        inputValue: "value",
        maxLength: "maxLength",
        minValue: "min",
        maxValue: "max",
        sizeValue: "size",
        stepValue: "step",
        isRequired: "required",
        isReadonly: "readOnly",
        isDisabled: "disabled",
        isChecked: "checked",
        patternRegexp: "pattern",
        accept: "accept",
        isMultiple: "multiple"
    };

    public getProperty(propertyName: string): any {
        const inputProperty = this.inputModel.getInputProperty(propertyName);

        if (inputProperty) {
            return inputProperty.propertyValue;
        }
        return "";
    }

    public setInput(container: HTMLElement, inputType: string, attributes: InputProperty[], label: string, help: string): void {
        const inputElement = <HTMLInputElement>document.createElement("input");
        inputElement.type = inputType;
        inputElement.classList.add(inputType === "range" ? "form-control-range" : "form-control");

        if (attributes.length > 0) {
            for (const attribute of attributes) {
                if (attribute.propertyValue) {
                    const attrName = this.inputPropertyMap[attribute.propertyName];
                    inputElement.setAttribute(attrName, attribute.propertyValue);
                }
            }
        }
        const controlId: string = inputElement.id;
        if (help) {
            inputElement.setAttribute("aria-describedby", `${controlId}Help`);
        }
        const _for = controlId && `for="${controlId}"`;
        let _id = controlId && `id="${controlId}Help"`;

        container.classList.add("form-group");
        container.innerHTML = `${!!label ? `<label ${_for}>${label}</label>` : ""}
                ${inputElement.outerHTML.trim()}
                ${!!help ? `<small ${_id} class="form-text text-muted">${help}</small>` : ""}`;
    }

    public setCheckbox(container: HTMLElement, showLabel: string, controlId: string, label: string, name: string, value: string, isRequired: boolean,
        isChecked: boolean, isInline: boolean, isDisabled: boolean): void {
        let inline = isInline ? " form-check-inline" : "";
        let _for = controlId ? `for="${controlId}"` : "";
        let _id = controlId ? `id="${controlId}"` : "";
        const _checked = isChecked ? "checked" : "";
        const _required = isRequired ? "required" : "";
        const _value = value ? `value="${value}"` : "";
        const _isDisabled = isDisabled ? "disabled" : "";

        container.classList.add("form-check");
        if (isInline) {
            container.classList.add("form-check-inline");
        } else {
            container.classList.remove("form-check-inline");
        }
        container.innerHTML = `${(label && showLabel === "before") ? `<label class="form-check-label" ${_for}>${label}</label>` : ""}
                <input class="form-check-input" type="checkbox" name="${name}" ${_id} ${_value} ${_checked} ${_isDisabled} ${_required}>
                ${(label && showLabel === "after") ? `<label class="form-check-label" ${_for}>${label}</label>` : ""}`;
    }

    public setRadio(container: HTMLElement, optionItems: OptionItem[], controlId: string, name: string, value: string, isRequired: boolean,
        isInline: boolean, isDisabled: boolean): void {
        let result = "";
        const inline = isInline ? " form-check-inline" : "";
        const _for = controlId ? `for="${controlId}"` : "";
        const _id = controlId ? `id="${controlId}"` : "";
        const _required = isRequired ? "required" : "";
        const _isDisabled = isDisabled ? "disabled" : "";

        for (const item of optionItems) {
            const _checked = value && item.itemValue === value ? "checked" : "";
            result += `\n<div class="form-check${inline}">
            <input class="form-check-input" type="radio" name="${name}" ${_id} value="${item.itemValue}" ${_checked} ${_isDisabled} ${_required}>
            <label class="form-check-label" ${_for}>${item.itemName}</label>
            </div>`;
        }

        container.innerHTML = result;
    }

    public setSubmit(container: HTMLElement, controlId: string, name: string, value: string, label: string, isDisabled: boolean): void {
        const _id = controlId ? `id="${controlId}"` : "";
        const _value = value ? `value="${value}"` : "";
        const _name = name ? `name="${name}"` : "";
        const _isDisabled = isDisabled ? "disabled" : "";
        container.innerHTML = `<button type="submit" ${_id} ${_name} ${_value} ${_isDisabled} class="btn btn-primary">${label || "Submit"}</button>`;
    }

    public setHidden(container: HTMLElement, controlId: string, name: string, value: string): void {
        const _id = controlId ? `id="${controlId}"` : "";
        const _value = value ? `value="${value}"` : "";
        const _name = name ? `name="${name}"` : "";
        container.innerHTML = `<input type="hidden" ${_id} ${_name} ${_value}>`;
    }

    public setReset(container: HTMLElement, value: string): void {
        const _value = value ? `value="${value}"` : "";
        container.innerHTML = `<input type="reset" ${_value} class="btn btn-primary">`;
    }

    public setSelect(container: HTMLElement, controlId: string, label: string, name: string, value: string, optionItems: OptionItem[], placeholder: string, isRequired: boolean,
        size: string, isMultiple: boolean, isDisabled: boolean): void {
        let options = !!placeholder ? `<option selected disabled>${placeholder}</option>` : "";

        for (const item of optionItems) {
            const selected = value && item.itemValue === value ? "selected" : "";
            options += `/n<option value="${item.itemValue || item.itemName}" ${selected}>${item.itemName || item.itemValue}</option>`;
        }
        const _for = controlId ? `for="${controlId}"` : "";
        const _id = controlId ? `id="${controlId}"` : "";
        const _required = isRequired ? "required" : "";
        const _isMultiple = isMultiple ? "multiple" : "";
        const _size = size ? `size="${size}"` : "";
        const _isDisabled = isDisabled ? "disabled" : "";
        container.classList.add("form-group");
        container.innerHTML =
            `${!!label ? `<label ${_for}>${label}</label>` : ""}
                <select class="form-control" ${_id} name="${name}" ${_size} ${_isMultiple} ${_required} ${_isDisabled}>
                    ${options}
                </select>`;
    }

    public setTextarea(container: HTMLElement, controlId: string, label: string, name: string, textValue: string, isRequired: boolean,
        rows: string, cols: string, maxLength: string, placeholder: string, isDisabled: boolean, isReadonly: boolean): void {
        const _for = controlId ? `for="${controlId}"` : "";
        const _id = controlId ? `id="${controlId}"` : "";
        const _required = isRequired ? "required" : "";
        const _rows = rows ? `rows="${rows}"` : "";
        const _cols = cols ? `cols="${cols}"` : "";
        const _maxlength = maxLength ? `maxlength="${maxLength}"` : "";
        const _placeholder = placeholder ? `placeholder="${placeholder}"` : "";
        const _isDisabled = isDisabled ? "disabled" : "";
        const _isReadonly = isReadonly ? "readonly" : "";
        container.classList.add("form-group");
        container.innerHTML =
            `${!!label ? `<label ${_for}>${label}</label>` : ""}
                <textarea class="form-control" ${_id} name="${name}" ${_rows} ${_cols} ${_required} ${_maxlength} ${_placeholder} ${_isDisabled} ${_isReadonly}>${textValue}</textarea>`;
    }

    public setControlHtml(container: HTMLElement): void {
        const showLabel: string = this.getProperty("showLabel");
        const controlId: string = this.getProperty("inputId");
        const label: string = this.getProperty("labelText");
        const name: string = this.getProperty("inputName");
        const value: string = this.getProperty("inputValue");
        const isChecked: boolean = this.getProperty("isChecked");
        const isRequired: boolean = this.getProperty("isRequired");
        const isReadonly: boolean = this.getProperty("isReadonly");
        const isDisabled: boolean = this.getProperty("isDisabled");
        const isInline: boolean = this.getProperty("isInline");

        const help: string = this.getProperty("help");
        const placeholder: string = this.getProperty("placeholderText");
        const size: string = this.getProperty("sizeValue");
        const rows: string = this.getProperty("rowsCount");
        const cols: string = this.getProperty("colsCount");
        const isMultiple: boolean = this.getProperty("isMultiple");
        const textValue: string = this.getProperty("textValue");
        const maxLength: string = this.getProperty("maxLength");

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
                this.setInput(container, this.inputModel.inputType, this.inputModel.properties, label, help);
        }
    }
}