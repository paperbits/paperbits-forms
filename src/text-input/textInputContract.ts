import { Contract } from "@paperbits/common";
import { HyperlinkContract } from "@paperbits/common/editing";


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
     * Initial value.
     */
    value: string;

    /**
     * TextInput local styles.
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