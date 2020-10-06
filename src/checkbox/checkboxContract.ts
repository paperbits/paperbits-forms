import { Contract } from "@paperbits/common";


/**
 * Checkbox data contract.
 */
export interface CheckboxContract extends Contract {
    /**
     * Label on the checkbox.
     */
    label: string;

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
     * Checkbox local styles.
     */
    styles?: any;
}