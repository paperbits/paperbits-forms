import { LocalStyles } from "@paperbits/common/styles";

/**
 * Multi-line input widget model.
 */
export class MultilineInputModel {
    /**
     * Input label.
     */
    public label: string;

    /**
     * Field name.
     */
    public name: string;

    /**
     * Input placeholder.
     */
    public placeholder: string;

    /**
     * Indicates that field is readonly.
     */
    public readonly: boolean;

    /**
     * Indicates that field is required.
     */
    public required: boolean;

    /**
     * Maximum allowed number of characters.
     */
    public maxLength: number;

    /**
     * Input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Multi-line input";
        this.name = "multiline";
        this.styles = { appearance: "components/formControl/default" };
    }
}
