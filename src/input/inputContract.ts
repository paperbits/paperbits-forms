/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { Contract } from "@paperbits/common";

export interface InputContract extends Contract {

    inputProperties?: {
        propertyName: string;
        propertyValue: any;
    }[];

    options?: {
        itemName: string;
        itemValue: any;
    }[];
}