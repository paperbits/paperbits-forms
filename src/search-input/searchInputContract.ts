import { Contract } from "@paperbits/common";
import { HyperlinkContract } from "@paperbits/common/editing";


/**
 * Search input data contract.
 */
export interface SearchInputContract extends Contract {
    /**
     * Label on the search input.
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
     * Search input local styles.
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