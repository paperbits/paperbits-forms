import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";


/**
 * Email input data contract.
 */
export interface EmailInputContract extends Contract {
    /**
     * Label on the email input.
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
     * Email input local styles.
     */
    styles?: LocalStyles;
}