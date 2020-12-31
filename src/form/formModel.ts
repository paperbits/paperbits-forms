/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

export class FormModel {
    public widgets: any[];
    public formAction: string;
    public formMethod?: string;
    public formTarget?: string;
    public acceptCharset?: string;
    public encType?: string;
    public identifier: string;
    public formName?: string;
    public description?: string;
    public isInline?: boolean;

    constructor() {
        this.widgets = [];
    }
}