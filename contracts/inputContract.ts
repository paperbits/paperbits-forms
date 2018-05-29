import { Contract } from "@paperbits/common";

export interface InputContract extends Contract {
    inputId?  : string;
    showLabel?: string;
    labelText?: string;
    inputType : string;
    inputName?: string;
    placeholderText?: string;
    inputValue?: string | number;
    maxLength? : number;
    minValue?  : number;
    maxValue?  : number;
    sizeValue? : number;
    stepValue? : number;
    isRequired?: boolean;
    isReadonly?: boolean;
    isDisabled?: boolean;
    isChecked? : boolean;
    patternRegexp?: string;
    accept?: string;
    isInline? : boolean;
}