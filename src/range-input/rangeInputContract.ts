import { Contract } from "@paperbits/common";


/**
 * Range input data contract.
 */
export interface RangeInputContract extends Contract {
    /**
     * Label on the range input.
     */
    label: string;

    /**
     * Field name. Used in form submission.
     */
    name: string;

    /**
     * Minimum value.
     */
    minValue: number;

    /**
     * Maximum value.
     */
    maxValue: number;

    /**
     * Initial value.
     */
    value: number;

    /**
     * Indicates that field is readonly.
     */
    readonly: boolean;

    /**
     * Range input local styles.
     */
    styles?: any;
}