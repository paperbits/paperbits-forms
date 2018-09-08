import { Contract } from "@paperbits/common";

export interface InputContract extends Contract {

    inputProperties?: {
        propertyName: string;
        propertyValue: any;
    }[];

    options?: {
        itemName: string;
        itemValue: any;
    }[];
}