import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";


/**
 * TextInput data contract.
 */
export interface TextInputContract extends Contract {
    /**
     * Label on the textInput.
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
     * Initial field value.
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
     * Invalid feedback message.
     */
    invalidFeedback: string;

    /**
     * TextInput local styles.
     */
    styles?: LocalStyles;
}