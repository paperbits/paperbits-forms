import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";


/**
 * Time input data contract.
 */
export interface TimeInputContract extends Contract {
    /**
     * Label on the time input.
     */
    label: string;

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
     * Time input local styles.
     */
    styles?: LocalStyles;
}