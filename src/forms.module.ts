/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormModule } from "./form/ko/form.module";
import { SubmitModule } from "./submit/ko/submit.module";
import { TextInputModule } from "./text-input/ko";
import { PasswordInputModule } from "./password-input/ko";
import { EmailInputModule } from "./email-input/ko";
import { DateInputModule } from "./date-input/ko";
import { TimeInputModule } from "./time-input/ko";
import { UrlInputModule } from "./url-input/ko";
import { NumberInputModule } from "./number-input/ko";
import { MultilineInputModule } from "./multiline-input/ko";
import { CheckboxModule } from "./checkbox/ko";
import { RangeInputModule } from "./range-input/ko";
import { SelectInputModule } from "./select/ko";

export class FormsModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormModule());
        injector.bindModule(new SubmitModule());
        injector.bindModule(new TextInputModule());
        injector.bindModule(new PasswordInputModule());
        injector.bindModule(new EmailInputModule());
        injector.bindModule(new DateInputModule());
        injector.bindModule(new TimeInputModule());
        injector.bindModule(new UrlInputModule());
        injector.bindModule(new NumberInputModule());
        injector.bindModule(new MultilineInputModule());
        injector.bindModule(new CheckboxModule());
        injector.bindModule(new RangeInputModule());
        injector.bindModule(new SelectInputModule());
    }
}