import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { SelectEditor } from "./selectEditor";
import { SelectHandlers } from "../selectHandlers";
import { SelectModule } from "./select.module";

export class SelectEditorModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {        
        injector.bindModule(new SelectModule(this.modelBinders, this.viewModelBinders));

        //editors
        injector.bind("selectEditor", SelectEditor);

        //handlers
        injector.bindSingleton("selectHandlers", SelectHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");
        widgetHandlers.push(injector.resolve<SelectHandlers>("selectHandlers"));
    }
}