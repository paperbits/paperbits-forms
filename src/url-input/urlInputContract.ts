import { Contract } from "@paperbits/common";


/**
 * URL input data contract.
 */
export interface UrlInputContract extends Contract {
    /**
     * Label on the url input.
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
    value: string;

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
     * URL input local styles.
     */
    styles?: any;
}