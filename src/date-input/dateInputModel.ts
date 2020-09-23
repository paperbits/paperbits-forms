import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class DateInputModel {
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
     * Indicates that field is readonly.
     */
    public readonly: boolean;

    /**
     * Indicates that field is required.
     */
    public required: boolean;

    /**
     * Text input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Date input";
        this.name = "date";
        this.value = null;
        this.styles = { appearance: "components/formControl/default" };
    }
}
