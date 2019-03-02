
/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormsModule } from "./forms.module";
import { FormEditorModule } from "./form/ko/formEditor.module";
import { InputEditorModule } from "./input/ko/inputEditor.module";

export class FormsEditModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormsModule());
        injector.bindModule(new FormEditorModule());
        injector.bindModule(new InputEditorModule());
    }
}