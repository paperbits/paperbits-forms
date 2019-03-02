/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { InputModel } from "./inputModel";

export class ColorInputModel extends InputModel {
    constructor() {
        super("color");

        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "inputValue", propertyValue: undefined });
        this.properties.push({ propertyName: "isRequired", propertyValue: undefined });
        this.properties.push({ propertyName: "isReadonly", propertyValue: undefined });
    }
}