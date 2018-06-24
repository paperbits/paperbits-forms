import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { FormEditor } from "./formEditor";
import { FormHandlers } from "../formHandlers";

export class FormEditorModule implements IInjectorModule {
    register(injector: IInjector): void {
        //editors
        injector.bind("formEditor", FormEditor);

        //handlers
        injector.bindSingleton("formHandlers", FormHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");        
        widgetHandlers.push(injector.resolve<FormHandlers>("formHandlers"));
    }
}