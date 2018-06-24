import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { TextareaModelBinder } from "../textareaModelBinder";
import { TextareaViewModelBinder } from "./textareaViewModelBinder";

export class TextareaModule implements IInjectorModule {
    register(injector: IInjector): void {
        //modelBinders
        injector.bind("textareaModelBinder", TextareaModelBinder);
        const modelBinders = injector.resolve<Array<IModelBinder>>("modelBinders");        
        modelBinders.push(injector.resolve("textareaModelBinder"));

        //viewModelBinders
        injector.bind("textareaViewModelBinder", TextareaViewModelBinder);
        const viewModelBinders = injector.resolve<Array<IViewModelBinder<any, any>>>("viewModelBinders");
        viewModelBinders.push(injector.resolve("textareaViewModelBinder"));
    }
}