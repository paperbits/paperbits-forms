import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { InputModelBinder } from "../inputModelBinder";
import { InputViewModelBinder } from "./inputViewModelBinder";
import { InputBindingHandler } from "./inputBindingHandler";

export class InputModule implements IInjectorModule {
    public register(injector: IInjector): void {
        // modelBinders
        injector.bind("inputModelBinder", InputModelBinder);
        const modelBinders = injector.resolve<IModelBinder[]>("modelBinders");        
        modelBinders.push(injector.resolve("inputModelBinder"));

        // viewModelBinders
        injector.bind("inputViewModelBinder", InputViewModelBinder);
        const viewModelBinders = injector.resolve<IViewModelBinder<any, any>[]>("viewModelBinders");
        viewModelBinders.push(injector.resolve("inputViewModelBinder"));

        
        injector.bindSingleton("inputBindingHandler", InputBindingHandler);
    }
}