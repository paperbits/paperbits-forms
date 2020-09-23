import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { NumberInput } from "./ko/numberInput";
import { NumberInputModelBinder } from "./numberInputModelBinder";
import { NumberInputViewModelBinder } from "./ko/numberInputViewModelBinder";


export class NumberInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("numberInput", NumberInput);
        injector.bindToCollection("modelBinders", NumberInputModelBinder);
        injector.bindToCollection("viewModelBinders", NumberInputViewModelBinder);
    }
}