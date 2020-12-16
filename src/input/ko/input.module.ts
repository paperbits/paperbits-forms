/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { GenericInputModelBinder } from "../inputModelBinder";
import { GenericInputViewModelBinder } from "./inputViewModelBinder";
import { InputBindingHandler } from "./inputBindingHandler";

import {
    RadioInputModel
} from "..";

export class InputModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const inputModelBinder = new GenericInputModelBinder();
        inputModelBinder.registerInput("input:radio", RadioInputModel);
        injector.bindInstanceToCollection("modelBinders", inputModelBinder);

        const inputViewModelBinder = new GenericInputViewModelBinder(injector.resolve("eventManager"));
        inputViewModelBinder.registerInput("Radio group", RadioInputModel);
        injector.bindInstanceToCollection("viewModelBinders", inputViewModelBinder);

        injector.bindToCollection("autostart", InputBindingHandler);
    }
}