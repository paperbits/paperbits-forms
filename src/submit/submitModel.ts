import { LocalStyles } from "@paperbits/common/styles";

/**
 * Submit widget model.
 */
export class SubmitModel {
    /**
     * Label on the submit.
     */
    public label: string;

    /**
     * Submit local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Submit";
        this.styles = { appearance: "components/button/default" };
    }
}
