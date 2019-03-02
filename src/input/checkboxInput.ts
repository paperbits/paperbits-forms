/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { InputModel } from "./inputModel";

export class CheckboxInputModel extends InputModel {
    constructor() {
        super("checkbox");

        this.properties.push({ propertyName: "showLabel", propertyValue: "after" });
        this.properties.push({ propertyName: "labelText", propertyValue: "First option" });
        this.properties.push({ propertyName: "isInline", propertyValue: undefined });
        this.properties.push({ propertyName: "isChecked", propertyValue: undefined });
        this.properties.push({ propertyName: "inputValue", propertyValue: "" });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
    }
}