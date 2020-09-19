import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { EmailInput } from "./ko/emailInput";
import { EmailInputModelBinder } from "./emailInputModelBinder";
import { EmailInputViewModelBinder } from "./ko/emailInputViewModelBinder";


export class EmailInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("emailInput", EmailInput);
        injector.bindToCollection("modelBinders", EmailInputModelBinder);
        injector.bindToCollection("viewModelBinders", EmailInputViewModelBinder);
    }
}