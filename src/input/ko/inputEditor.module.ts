import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
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
        // editors
        injector.bind("inputEditor", InputEditor);

        // handlers
        const widgetHandlers: IWidgetHandler[] = injector.resolve("widgetHandlers");
        widgetHandlers.push(new InputHandlers(new TextInputModel()));
        widgetHandlers.push(new InputHandlers(new SubmitInputModel()));
        widgetHandlers.push(new InputHandlers(new PasswordInputModel()));
        widgetHandlers.push(new InputHandlers(new ResetInputModel()));
        widgetHandlers.push(new InputHandlers(new SelectInputModel()));
        widgetHandlers.push(new InputHandlers(new RadioInputModel()));
        widgetHandlers.push(new InputHandlers(new CheckboxInputModel()));
        widgetHandlers.push(new InputHandlers(new TextareaInputModel()));
        widgetHandlers.push(new InputHandlers(new ColorInputModel()));
        widgetHandlers.push(new InputHandlers(new DateInputModel()));
        widgetHandlers.push(new InputHandlers(new TimeInputModel()));
        widgetHandlers.push(new InputHandlers(new EmailInputModel()));
        widgetHandlers.push(new InputHandlers(new NumberInputModel()));
        widgetHandlers.push(new InputHandlers(new RangeInputModel()));
        widgetHandlers.push(new InputHandlers(new SearchInputModel()));
        widgetHandlers.push(new InputHandlers(new UrlInputModel()));
    }
}