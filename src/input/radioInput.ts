/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { InputModel } from "./inputModel";

export class RadioInputModel extends InputModel {
    constructor() {
        super("radio");

        this.properties.push({ propertyName: "inputValue", propertyValue: null });
        this.properties.push({ propertyName: "isInline", propertyValue: false });
        this.properties.push({ propertyName: "isRequired", propertyValue: false });
        this.options = [
            { itemName: "First option", itemValue: "first" },
            { itemName: "Second option", itemValue: "second" },
            { itemName: "Third option", itemValue: "third" }
        ];
    }
}