import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class TextInputModel {
    /**
     * Text input label.
     */
    public label: string;

    /**
     * Text input initial value.
     */
    public value: string;

    /**
     * Text input placeholder.
     */
    public placeholder: string;

    /**
     * Text input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Label";
        this.value = "";
        this.placeholder = "e.g. First name";
        this.styles = { appearance: "components/formControl/default" };
    }
}
