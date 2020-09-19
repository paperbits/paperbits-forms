import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class SearchInputModel {
    /**
     * Text input label.
     */
    public label: string;

    /**
     * Field name.
     */
    public name: string;

    /**
     * Text input initial value.
     */
    public value: string;

    /**
     * Text input placeholder.
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
     * Text input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Search";
        this.name = "search";
        this.value = "";
        this.placeholder = "Search website";
        this.styles = { appearance: "components/formControl/default" };
    }
}
