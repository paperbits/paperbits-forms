import { Contract } from "@paperbits/common";


/**
 * Date input data contract.
 */
export interface DateInputContract extends Contract {
    /**
     * Label on the date input.
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
     * Date input local styles.
     */
    styles?: any;
}