import { Contract } from "@paperbits/common";
import { HyperlinkContract } from "@paperbits/common/editing";


/**
 * Url input data contract.
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
     * Field name.
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
     * Url input local styles.
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