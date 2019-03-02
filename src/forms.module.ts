/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormModule } from "./form/ko/form.module";
import { InputModule } from "./input/ko/input.module";

export class FormsModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormModule());
        injector.bindModule(new InputModule());
    }
}