import { Contract } from "@paperbits/common";

export interface InputContract extends Contract {
    inputType: string;
    inputProperties: {
        propertyName: string;
        propertyValue: any;
    }[];
    options?: {
        itemName: string;
        itemValue: any;
    }[];
}