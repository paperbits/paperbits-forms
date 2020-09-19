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
    SelectInputModel,
    RadioInputModel,
    CheckboxInputModel,
    TextareaInputModel,
    ColorInputModel,
    DateInputModel,
    TimeInputModel,
    NumberInputModel,
    RangeInputModel
} from "..";

export class InputModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const inputModelBinder = new GenericInputModelBinder();
        inputModelBinder.registerInput("input:select", SelectInputModel);
        inputModelBinder.registerInput("input:radio", RadioInputModel);
        inputModelBinder.registerInput("input:checkbox", CheckboxInputModel);
        inputModelBinder.registerInput("input:textarea", TextareaInputModel);
        inputModelBinder.registerInput("input:color", ColorInputModel);
        inputModelBinder.registerInput("input:date", DateInputModel);
        inputModelBinder.registerInput("input:time", TimeInputModel);
        inputModelBinder.registerInput("input:number", NumberInputModel);
        inputModelBinder.registerInput("input:range", RangeInputModel);
        injector.bindInstanceToCollection("modelBinders", inputModelBinder);

        const inputViewModelBinder = new GenericInputViewModelBinder(injector.resolve("eventManager"));
        inputViewModelBinder.registerInput("Select", SelectInputModel);
        inputViewModelBinder.registerInput("Radio group", RadioInputModel);
        inputViewModelBinder.registerInput("Check box", CheckboxInputModel);
        inputViewModelBinder.registerInput("Multiline text input", TextareaInputModel);
        inputViewModelBinder.registerInput("Color picker", ColorInputModel);
        inputViewModelBinder.registerInput("Date picker", DateInputModel);
        inputViewModelBinder.registerInput("Time picker", TimeInputModel);
        inputViewModelBinder.registerInput("Number input", NumberInputModel);
        inputViewModelBinder.registerInput("Range picker", RangeInputModel);
        injector.bindInstanceToCollection("viewModelBinders", inputViewModelBinder);

        injector.bindToCollection("autostart", InputBindingHandler);
    }
}