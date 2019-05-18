/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { FormModelBinder } from "../formModelBinder";
import { FormViewModelBinder } from "./formViewModelBinder";

export class FormModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindToCollection("modelBinders", FormModelBinder);
        injector.bindToCollection("viewModelBinders", FormViewModelBinder);
    }
}