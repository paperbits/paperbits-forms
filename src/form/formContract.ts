import { Contract } from "@paperbits/common/contract";

export interface FormContract extends Contract {
    formAction: string;
    formMethod?: string;
    formTarget?: string;
    acceptCharset?: string;
    encType?: string;
    formName?: string;
    description?: string;
    isInline?: boolean;
}