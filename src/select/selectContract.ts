import { Contract } from "@paperbits/common";

export interface SelectContract extends Contract {
    selectId?: string;
    showLabel?: string;
    labelText?: string;
    selectName?: string;
    textValue?: string;
    sizeCount?: number;
    isMultiple?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;

    optionsList: any[];
    defaultText?: string;
}