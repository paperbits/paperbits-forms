import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";


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
     * Invalid feedback message.
     */
    invalidFeedback: string;

    /**
     * Checkbox local styles.
     */
    styles?: LocalStyles;
}