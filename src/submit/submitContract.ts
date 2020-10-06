import { Contract } from "@paperbits/common";


/**
 * Submit data contract.
 */
export interface SubmitContract extends Contract {
    /**
     * Label on the submit.
     */
    label: string;

    /**
     * Submit local styles.
     */
    styles?: any;
}