/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { GenericInputModelBinder } from "../inputModelBinder";
import { GenericInputViewModelBinder } from "./inputViewModelBinder";
import { InputBindingHandler } from "./inputBindingHandler";

import {
    SubmitInputModel,
    PasswordInputModel,
    ResetInputModel,
    TextInputModel,
    SelectInputModel,
    RadioInputModel,
    CheckboxInputModel,
    TextareaInputModel,
    ColorInputModel,
    DateInputModel,
    TimeInputModel,
    EmailInputModel,
    NumberInputModel,
    RangeInputModel,
    UrlInputModel,
    SearchInputModel
} from "..";

export class InputModule implements IInjectorModule {
    public register(injector: IInjector): void {
        const inputModelBinder = new GenericInputModelBinder();
        inputModelBinder.registerInput("input:text", TextInputModel);
        inputModelBinder.registerInput("input:submit", SubmitInputModel);
        inputModelBinder.registerInput("input:password", PasswordInputModel);
        inputModelBinder.registerInput("input:reset", ResetInputModel);
        inputModelBinder.registerInput("input:select", SelectInputModel);
        inputModelBinder.registerInput("input:radio", RadioInputModel);
        inputModelBinder.registerInput("input:checkbox", CheckboxInputModel);
        inputModelBinder.registerInput("input:textarea", TextareaInputModel);
        inputModelBinder.registerInput("input:color", ColorInputModel);
        inputModelBinder.registerInput("input:date", DateInputModel);
        inputModelBinder.registerInput("input:time", TimeInputModel);
        inputModelBinder.registerInput("input:email", EmailInputModel);
        inputModelBinder.registerInput("input:number", NumberInputModel);
        inputModelBinder.registerInput("input:range", RangeInputModel);
        inputModelBinder.registerInput("input:search", SearchInputModel);
        inputModelBinder.registerInput("input:url", UrlInputModel);
        injector.bindInstanceToCollection("modelBinders", inputModelBinder);

        const inputViewModelBinder = new GenericInputViewModelBinder(injector.resolve("eventManager"));
        inputViewModelBinder.registerInput("Text input", TextInputModel);
        inputViewModelBinder.registerInput("Submit form button", SubmitInputModel);
        inputViewModelBinder.registerInput("Password input", PasswordInputModel);
        inputViewModelBinder.registerInput("Reset", ResetInputModel);
        inputViewModelBinder.registerInput("Select", SelectInputModel);
        inputViewModelBinder.registerInput("Radio group", RadioInputModel);
        inputViewModelBinder.registerInput("Check box", CheckboxInputModel);
        inputViewModelBinder.registerInput("Multiline text input", TextareaInputModel);
        inputViewModelBinder.registerInput("Color picker", ColorInputModel);
        inputViewModelBinder.registerInput("Date picker", DateInputModel);
        inputViewModelBinder.registerInput("Time picker", TimeInputModel);
        inputViewModelBinder.registerInput("Email input", EmailInputModel);
        inputViewModelBinder.registerInput("Number input", NumberInputModel);
        inputViewModelBinder.registerInput("Range picker", RangeInputModel);
        inputViewModelBinder.registerInput("Search input", SearchInputModel);
        inputViewModelBinder.registerInput("URL input", UrlInputModel);
        injector.bindInstanceToCollection("viewModelBinders", inputViewModelBinder);

        injector.bindToCollection("autostart", InputBindingHandler);
    }
}