import { LocalStyles } from "@paperbits/common/styles";

/**
 * Password input widget model.
 */
export class PasswordInputModel {
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
        this.label = "Password input";
        this.name = "password";
        this.placeholder = "e.g. P@ssw0rd";
        this.styles = { appearance: "components/formControl/default" };
    }
}
