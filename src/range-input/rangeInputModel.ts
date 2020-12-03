import { LocalStyles } from "@paperbits/common/styles";

/**
 * Text input widget model.
 */
export class RangeInputModel {
    /**
     * Text input label.
     */
    public label: string;

    /**
     * Field name.
     */
    public name: string;

    /**
     * Minimum value.
     */
    public minValue: number;

    /**
     * Maximum value.
     */
    public maxValue: number;

    /**
     * Range input initial value.
     */
    public value: number;

    /**
     * Indicates that field is readonly.
     */
    public readonly: boolean;

    /**
     * Text input local styles.
     */
    public styles: LocalStyles;

    constructor() {
        this.label = "Range input";
        this.name = "range";
        this.value = 50;
        this.minValue = 0;
        this.maxValue = 100;
    }
}
