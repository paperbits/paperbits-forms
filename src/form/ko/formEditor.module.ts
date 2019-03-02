/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at style-guidehttps://paperbits.io/license/mit.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { FormEditor } from "./formEditor";
import { FormHandlers } from "../formHandlers";

export class FormEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("formEditor", FormEditor);
        injector.bindToCollection<IWidgetHandler>("widgetHandlers", FormHandlers, "formHandler");
    }
}