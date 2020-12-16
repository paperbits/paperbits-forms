import { Contract } from "@paperbits/common";
import { SelectInputOption } from "./ko/selectInputOption";


/**
 * Password input data contract.
 */
export interface SelectContract extends Contract {
    /**
     * Label on the password input.
     */
    label: string;

    /**
     * Placeholder.
     */
    placeholder: string;

    /**
     * Field name. Used in form submission.
     */
    name: string;

    /**
     * Indicates that field is readonly.
     */
    readonly: boolean;

    /**
     * Indicates that field is required.
     */
    required: boolean;

    /**
     * Available options.
     */
    options: SelectInputOption[];

    /**
     * Value selected by default.
     */
    value: string;

    /**
     * Password input local styles.
     */
    styles?: any;
}