import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class EmailInputModel {
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
        this.label = "Email input";
        this.name = "email";
        this.value = "";
        this.placeholder = "e.g. john.doe@contoso.com";
        this.styles = { appearance: "components/formControl/default" };
    }
}
