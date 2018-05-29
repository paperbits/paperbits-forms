export class FormModel {
    widgets: any[];
    formAction: string;
    formMethod?: "get" | "post";
    formTarget?: "_self" | "_blank" | "_parent" | "_top";
    acceptCharset?: string;
    encType?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    formName?: string;
    isFieldset?: boolean;
    legendText?: string;
    legendAlign?: "left" | "right" | "top" | "bottom";
    description?: string;
    isInline?: boolean;

    constructor() {
        this.widgets = [];
    }
}