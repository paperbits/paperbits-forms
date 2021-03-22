import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";


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
    styles?: LocalStyles;
}