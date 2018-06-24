import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { SelectModelBinder } from "../selectModelBinder";
import { SelectViewModelBinder } from "./selectViewModelBinder";

export class SelectModule implements IInjectorModule {
    register(injector: IInjector): void {
        //modelBinders
        injector.bind("selectModelBinder", SelectModelBinder);
        const modelBinders = injector.resolve<Array<IModelBinder>>("modelBinders");        
        modelBinders.push(injector.resolve("selectModelBinder"));

        //viewModelBinders
        injector.bind("selectViewModelBinder", SelectViewModelBinder);
        const viewModelBinders = injector.resolve<Array<IViewModelBinder<any, any>>>("viewModelBinders");
        viewModelBinders.push(injector.resolve("selectViewModelBinder"));
    }
}