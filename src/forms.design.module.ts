
/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormsModule } from "./forms.module";
import { FormEditorModule } from "./form/ko/formEditor.module";
import { InputEditorModule } from "./input/ko/inputEditor.module";
import { SubmitEditorModule } from "./submit/ko/submitEditor.module";
import { TextInputEditorModule } from "./text-input/ko";
import { PasswordInputDesignModule } from "./password-input/ko";
import { EmailInputDesignModule } from "./email-input/ko";
import { DateInputDesignModule } from "./date-input/ko";
import { TimeInputDesignModule } from "./time-input/ko";
import { UrlInputDesignModule } from "./url-input/ko";
import { NumberInputDesignModule } from "./number-input/ko";


export class FormsDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormsModule());
        injector.bindModule(new FormEditorModule());
        injector.bindModule(new InputEditorModule());
        injector.bindModule(new SubmitEditorModule());
        injector.bindModule(new TextInputEditorModule());
        injector.bindModule(new PasswordInputDesignModule());
        injector.bindModule(new EmailInputDesignModule());
        injector.bindModule(new DateInputDesignModule());
        injector.bindModule(new TimeInputDesignModule());
        injector.bindModule(new UrlInputDesignModule());
        injector.bindModule(new NumberInputDesignModule());
    }
}