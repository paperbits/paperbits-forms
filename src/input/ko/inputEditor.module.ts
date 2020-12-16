/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { InputEditor } from "./inputEditor";
import { InputHandlers } from "../inputHandlers";
import {
    RadioInputModel
} from "..";

export class InputEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("inputEditor", InputEditor);
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new RadioInputModel()));
    }
}