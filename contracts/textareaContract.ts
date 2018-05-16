import { Contract } from "@paperbits/common";

export interface TextareaContract extends Contract {
    textareaId?: string;
    showLabel?: string;
    labelText?: string;
    textareaName?:string;
    placeholderText?: string;
    textValue?: string;
    colsCount?: number;
    rowsCount?: number;
    maxLength?: number;
    isRequired?: boolean;
    isReadonly?: boolean;
    isDisabled?: boolean;
}