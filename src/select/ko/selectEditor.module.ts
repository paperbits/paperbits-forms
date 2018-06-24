import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { SelectEditor } from "./selectEditor";
import { SelectHandlers } from "../selectHandlers";

export class SelectEditorModule implements IInjectorModule {
    register(injector: IInjector): void {
        //editors
        injector.bind("selectEditor", SelectEditor);

        //handlers
        injector.bindSingleton("selectHandlers", SelectHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");
        widgetHandlers.push(injector.resolve<SelectHandlers>("selectHandlers"));
    }
}