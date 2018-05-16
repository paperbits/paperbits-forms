export class SelectModel {
    selectId?: string;
    showLabel?: "before" | "after";
    labelText?: string;
    selectName: string;
    textValue?: string;
    sizeCount?: number;
    isMultiple?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;

    optionsList: any[];
    defaultText?: string;
}