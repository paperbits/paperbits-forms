import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { TextInput } from "./textInput";
import { TextInputModelBinder } from "../textInputModelBinder";
import { TextInputViewModelBinder } from "./textInputViewModelBinder";


export class TextInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("textInput", TextInput);
        injector.bindToCollection("modelBinders", TextInputModelBinder);
        injector.bindToCollection("viewModelBinders", TextInputViewModelBinder);
    }
}