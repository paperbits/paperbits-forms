import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PasswordInput } from "./passwordInput";
import { PasswordInputModelBinder } from "../passwordInputModelBinder";
import { PasswordInputViewModelBinder } from "./passwordInputViewModelBinder";


export class PasswordInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("passwordInput", PasswordInput);
        injector.bindToCollection("modelBinders", PasswordInputModelBinder);
        injector.bindToCollection("viewModelBinders", PasswordInputViewModelBinder);
    }
}