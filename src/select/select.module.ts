import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { SelectInput } from "./ko/selectInput";
import { SelectModelBinder } from "./selectModelBinder";
import { SelectViewModelBinder } from "./ko/selectViewModelBinder";


export class SelectInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("selectInput", SelectInput);
        injector.bindToCollection("modelBinders", SelectModelBinder);
        injector.bindToCollection("viewModelBinders", SelectViewModelBinder);
    }
}