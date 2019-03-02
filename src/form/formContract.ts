/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { Contract } from "@paperbits/common/contract";

export interface FormContract extends Contract {
    formAction: string;
    formMethod?: string;
    formTarget?: string;
    acceptCharset?: string;
    encType?: string;
    formName?: string;
    description?: string;
    isInline?: boolean;
}