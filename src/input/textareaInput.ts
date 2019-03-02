/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { InputModel } from "./inputModel";

export class TextareaInputModel extends InputModel {
    constructor() {
        super("textarea");

        this.properties.push({ propertyName: "placeholderText", propertyValue: "" });
        this.properties.push({ propertyName: "textValue", propertyValue: "" });
        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "colsCount", propertyValue: undefined });
        this.properties.push({ propertyName: "rowsCount", propertyValue: undefined });
        this.properties.push({ propertyName: "maxLength", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.properties.push({ propertyName: "isReadonly", propertyValue: undefined });
    }
}