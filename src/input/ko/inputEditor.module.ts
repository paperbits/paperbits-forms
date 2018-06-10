import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { InputModelBinder } from "../inputModelBinder";
import { InputEditor } from "./inputEditor";
import { InputHandlers } from "../inputHandlers";
import { InputModule } from "./input.module";

export class InputEditorModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {        
        injector.bindModule(new InputModule(this.modelBinders, this.viewModelBinders));

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