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
        widgetHandlers.push(new InputHandlers("text"));
        widgetHandlers.push(new InputHandlers("submit"));
        widgetHandlers.push(new InputHandlers("password"));
        widgetHandlers.push(new InputHandlers("reset"));
        widgetHandlers.push(new InputHandlers("select"));
        widgetHandlers.push(new InputHandlers("radio"));
        widgetHandlers.push(new InputHandlers("checkbox"));
        widgetHandlers.push(new InputHandlers("textarea"));
        widgetHandlers.push(new InputHandlers("color"));
        widgetHandlers.push(new InputHandlers("date"));
        widgetHandlers.push(new InputHandlers("time"));
        widgetHandlers.push(new InputHandlers("email"));
        widgetHandlers.push(new InputHandlers("number"));
        widgetHandlers.push(new InputHandlers("range"));
        widgetHandlers.push(new InputHandlers("search"));
        widgetHandlers.push(new InputHandlers("url"));
    }
}