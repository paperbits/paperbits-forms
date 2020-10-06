import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { Checkbox } from "./ko/checkbox";
import { CheckboxModelBinder } from "./checkboxModelBinder";
import { CheckboxViewModelBinder } from "./ko/checkboxViewModelBinder";


export class CheckboxModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("checkbox", Checkbox);
        injector.bindToCollection("modelBinders", CheckboxModelBinder);
        injector.bindToCollection("viewModelBinders", CheckboxViewModelBinder);
    }
}