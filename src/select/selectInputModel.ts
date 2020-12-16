import { LocalStyles } from "@paperbits/common/styles";
import { SelectInputOption } from "./ko/selectInputOption";

/**
 * Password input widget model.
 */
export class SelectInputModel {
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
     * Available options.
     */
    public options: SelectInputOption[];

    /**
     * Selected value.
     */
    public value: string;

    /**
     * Input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Select";
        this.name = "select";
        this.placeholder = "Select value";
        this.options = [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" }
        ];
        this.value = null;
        this.styles = { appearance: "components/formControl/default" };
    }
}
