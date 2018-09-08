import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { FormModelBinder } from "../formModelBinder";
import { FormViewModelBinder } from "./formViewModelBinder";

export class FormModule implements IInjectorModule {
    public register(injector: IInjector): void {
        // modelBinders
        injector.bind("formModelBinder", FormModelBinder);
        const modelBinders = injector.resolve<IModelBinder[]>("modelBinders");        
        modelBinders.push(injector.resolve("formModelBinder"));

        // viewModelBinders
        injector.bind("formViewModelBinder", FormViewModelBinder);
        const viewModelBinders = injector.resolve<IViewModelBinder<any, any>[]>("viewModelBinders");
        viewModelBinders.push(injector.resolve("formViewModelBinder"));
    }
}