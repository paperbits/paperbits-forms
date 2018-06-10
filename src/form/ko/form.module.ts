import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { FormModelBinder } from "../formModelBinder";
import { FormViewModelBinder } from "./formViewModelBinder";
import { FormEditor } from "./formEditor";
import { FormHandlers } from "../formHandlers";

export class FormModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        //modelBinders
        injector.bind("formModelBinder", FormModelBinder);        
        this.modelBinders.push(injector.resolve("formModelBinder"));

        //viewModelBinders
        injector.bind("formViewModelBinder", FormViewModelBinder);
        this.viewModelBinders.push(injector.resolve("formViewModelBinder"));
    }
}