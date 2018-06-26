import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { InputEditor } from "./inputEditor";
import { InputHandlers } from "../inputHandlers";

export class InputEditorModule implements IInjectorModule {
    register(injector: IInjector): void {
        //editors
        injector.bind("inputEditor", InputEditor);

        //handlers
        const widgetHandlers: Array<IWidgetHandler> = injector.resolve("widgetHandlers");
        //"text" | "password" | "submit" | "reset" | "radio" | "checkbox" | "button" | "color" | "date" | "email" | "number" | "range" | "search" | "time" | "url"
        widgetHandlers.push(new InputHandlers("text"));
        widgetHandlers.push(new InputHandlers("submit"));
        widgetHandlers.push(new InputHandlers("password"));
    }
}