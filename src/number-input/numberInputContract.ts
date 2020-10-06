import { Contract } from "@paperbits/common";


/**
 * Number input data contract.
 */
export interface NumberInputContract extends Contract {
    /**
     * Label on the number input.
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
     * Initial value.
     */
    value: number;

    /**
     * Indicates that field is readonly.
     */
    readonly: boolean;

    /**
     * Indicates that field is required.
     */
    required: boolean;

    /**
     * Minimum value the field can accept.
     */
    min: number;

    /**
     * Maximum value the field can accept.
     */
    max: number;

    /**
     * Number input local styles.
     */
    styles?: any;
}