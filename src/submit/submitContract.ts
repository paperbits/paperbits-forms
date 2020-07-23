import { Contract } from "@paperbits/common";
import { HyperlinkContract } from "@paperbits/common/editing";


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

    /**
     * Keys of user roles.
     */
    roles?: string[];
    
    /**
     * Assigned hyperlink.
     */
    hyperlink?: HyperlinkContract;
}