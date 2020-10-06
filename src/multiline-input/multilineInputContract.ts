import { Contract } from "@paperbits/common";


/**
 * Multi-line input data contract.
 */
export interface MultilineInputContract extends Contract {
    /**
     * Label on the Multi-line input.
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
     * Multi-line input local styles.
     */
    styles?: any;
}