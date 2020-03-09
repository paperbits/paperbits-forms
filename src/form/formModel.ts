/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

export class FormModel {
    public widgets: any[];
    public formAction: string;
    public formMethod?: "get" | "post";
    public formTarget?: "_self" | "_blank" | "_parent" | "_top";
    public acceptCharset?: string;
    public encType?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
    public identifier: string;
    public formName?: string;
    public description?: string;
    public isInline?: boolean;

    constructor() {
        this.widgets = [];
    }
}