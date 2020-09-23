import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class NumberInputModel {
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
    public value: number;

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
     * Minimum value the field can accept.
     */
    public min: number;

    /**
     * Maximum value the field can accept.
     */
    public max: number;

    /**
     * Text input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Number input";
        this.name = "quantity";
        this.value = null;
        this.placeholder = "e.g. 100";
        this.styles = { appearance: "components/formControl/default" };
    }
}
