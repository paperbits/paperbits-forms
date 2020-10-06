import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { MultilineInput } from "./ko/multilineInput";
import { MultilineInputModelBinder } from "./multilineInputModelBinder";
import { MultilineInputViewModelBinder } from "./ko/multilineInputViewModelBinder";


export class MultilineInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("multilineInput", MultilineInput);
        injector.bindToCollection("modelBinders", MultilineInputModelBinder);
        injector.bindToCollection("viewModelBinders", MultilineInputViewModelBinder);
    }
}