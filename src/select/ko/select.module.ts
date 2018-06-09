import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { SelectModelBinder } from "../selectModelBinder";
import { SelectViewModelBinder } from "./selectViewModelBinder";
import { SelectEditor } from "./selectEditor";
import { SelectHandlers } from "../selectHandlers";

export class SelectModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        //modelBinders
        injector.bind("selectModelBinder", SelectModelBinder);        
        this.modelBinders.push(injector.resolve("selectModelBinder"));

        //viewModelBinders
        injector.bind("selectViewModelBinder", SelectViewModelBinder);
        this.viewModelBinders.push(injector.resolve("selectViewModelBinder"));

        //editors
        injector.bind("selectEditor", SelectEditor);

        //handlers
        injector.bindSingleton("selectHandlers", SelectHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");
        widgetHandlers.push(injector.resolve<SelectHandlers>("selectHandlers"));
    }
}