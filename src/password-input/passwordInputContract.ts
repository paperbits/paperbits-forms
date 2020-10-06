import { Contract } from "@paperbits/common";


/**
 * Password input data contract.
 */
export interface PasswordInputContract extends Contract {
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
     * Maximum allowed number of characters.
     */
    maxLength: number;

    /**
     * Password input local styles.
     */
    styles?: any;
}