/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormModule } from "./form/ko/form.module";
import { InputModule } from "./input/ko/input.module";
import { SubmitModule } from "./submit/ko/submit.module";
import { TextInputModule } from "./text-input/ko";
import { PasswordInputModule } from "./password-input/ko";

export class FormsModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormModule());
        injector.bindModule(new InputModule());
        injector.bindModule(new SubmitModule());
        injector.bindModule(new TextInputModule());
        injector.bindModule(new PasswordInputModule());
    }
}