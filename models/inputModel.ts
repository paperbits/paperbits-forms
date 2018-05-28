export class InputModel {
    inputId?: string;
    showLabel?: "before" | "after";
    labelText?: string;
    inputType: "text" | "password" | "submit" | "reset" | "radio" | "checkbox" | "button" | "color" | "date" | "email" | "number" | "range" | "search" | "time" | "url";
    inputName?: string;
    placeholderText?: string;
    inputValue?: string | number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    sizeValue?: number;
    stepValue?: number;
    isRequired?: boolean;
    isReadonly?: boolean;
    isDisabled?: boolean;
    isChecked?: boolean;
    patternRegexp?: string;
    accept?: string;
}