import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class TimeInputModel {
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
        this.label = "Time input";
        this.name = "time";
        this.value = "";
        this.styles = { appearance: "components/formControl/default" };
    }
}
