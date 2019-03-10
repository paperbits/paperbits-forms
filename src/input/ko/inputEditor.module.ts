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

export class InputEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("inputEditor", InputEditor);
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new TextInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new SubmitInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new PasswordInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new ResetInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new SelectInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new RadioInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new CheckboxInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new TextareaInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new ColorInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new DateInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new TimeInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new EmailInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new NumberInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new RangeInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new SearchInputModel()));
        injector.bindInstanceToCollection("widgetHandlers", new InputHandlers(new UrlInputModel()));
    }
}