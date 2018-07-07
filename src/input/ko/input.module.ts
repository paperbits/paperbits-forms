import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { InputModelBinder } from "../inputModelBinder";
import { InputViewModelBinder } from "./inputViewModelBinder";
import { InputWidgetHandler } from "./inputWidgetHandler";

export class InputModule implements IInjectorModule {
    register(injector: IInjector): void {
        //modelBinders
        injector.bind("inputModelBinder", InputModelBinder);
        const modelBinders = injector.resolve<Array<IModelBinder>>("modelBinders");        
        modelBinders.push(injector.resolve("inputModelBinder"));

        //viewModelBinders
        injector.bind("inputViewModelBinder", InputViewModelBinder);
        const viewModelBinders = injector.resolve<Array<IViewModelBinder<any, any>>>("viewModelBinders");
        viewModelBinders.push(injector.resolve("inputViewModelBinder"));

        
        injector.bindSingleton("inputWidgetHandler", InputWidgetHandler);
    }
}