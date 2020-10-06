import { LocalStyles } from "@paperbits/common/styles";

/**
 * Checkbox widget model.
 */
export class CheckboxModel {
    /**
     * Input label.
     */
    public label: string;

    /**
     * Field name.
     */
    public name: string;

    /**
     * Indicates that field is readonly.
     */
    public readonly: boolean;

    /**
     * Indicates that field is required.
     */
    public required: boolean;

    /**
     * Input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Checkbox";
        this.name = "checkbox";
        this.styles = { appearance: "components/formControl/default" };
    }
}
