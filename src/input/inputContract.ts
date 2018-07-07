import { Contract } from "@paperbits/common";

export interface InputContract extends Contract {
    inputType : string;
    inputProperties: {
        propertyName: string;
        propertyValue: any;
    }[];
    options?: {
        itemName: string;
        itemValue: any;
    }[];


    // inputId?: string;
    // showLabel?: string;
    // labelText?: string;
    // inputName?: string;
    // placeholderText?: string;
    // inputValue?: string | number;
    // maxLength? : number;
    // minValue?  : number;
    // maxValue?  : number;
    // sizeValue? : number;
    // stepValue? : number;
    // isRequired?: boolean;
    // isReadonly?: boolean;
    // isDisabled?: boolean;
    // isChecked? : boolean;
    // patternRegexp?: string;
    // accept?: string;
    // isInline? : boolean;
}