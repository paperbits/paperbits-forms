export class FormModel {
    public widgets: any[];
    public formAction: string;
    public formMethod?: "get" | "post";
    public formTarget?: "_self" | "_blank" | "_parent" | "_top";
    public acceptCharset?: string;
    public encType?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    public formName?: string;
    public isFieldset?: boolean;
    public legendText?: string;
    public legendAlign?: "left" | "right" | "top" | "bottom";
    public description?: string;
    public isInline?: boolean;

    constructor() {
        this.widgets = [];
    }
}