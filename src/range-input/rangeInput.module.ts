import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { RangeInput } from "./ko/rangeInput";
import { RangeInputModelBinder } from "./rangeInputModelBinder";
import { RangeInputViewModelBinder } from "./ko/rangeInputViewModelBinder";


export class RangeInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("rangeInput", RangeInput);
        injector.bindToCollection("modelBinders", RangeInputModelBinder);
        injector.bindToCollection("viewModelBinders", RangeInputViewModelBinder);
    }
}