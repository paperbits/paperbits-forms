/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license.
 */

import { InputModel } from "./inputModel";

export class SubmitInputModel extends InputModel {
    constructor() {
        super("submit");

        this.properties.push({ propertyName: "labelText", propertyValue: "" });
        this.properties.push({ propertyName: "inputValue", propertyValue: undefined });
    }
}