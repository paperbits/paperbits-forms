import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { InputModelBinder } from "../inputModelBinder";
import { InputViewModelBinder } from "./inputViewModelBinder";
import { InputEditor } from "./inputEditor";
import { InputHandlers } from "../inputHandlers";

export class InputModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        //modelBinders
        injector.bind("inputModelBinder", InputModelBinder);        
        this.modelBinders.push(injector.resolve("inputModelBinder"));

        //viewModelBinders
        injector.bind("inputViewModelBinder", InputViewModelBinder);
        this.viewModelBinders.push(injector.resolve("inputViewModelBinder"));

        //editors
        injector.bind("inputEditor", InputEditor);

        //handlers
        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");
        //"text" | "password" | "submit" | "reset" | "radio" | "checkbox" | "button" | "color" | "date" | "email" | "number" | "range" | "search" | "time" | "url"
        widgetHandlers.push(new InputHandlers(injector.resolve<InputModelBinder>("inputModelBinder"), "text"));
        widgetHandlers.push(new InputHandlers(injector.resolve<InputModelBinder>("inputModelBinder"), "submit"));
        widgetHandlers.push(new InputHandlers(injector.resolve<InputModelBinder>("inputModelBinder"), "password"));
    }
}