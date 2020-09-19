import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { UrlInput } from "./ko/urlInput";
import { UrlInputModelBinder } from "./urlInputModelBinder";
import { UrlInputViewModelBinder } from "./ko/urlInputViewModelBinder";


export class UrlInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("urlInput", UrlInput);
        injector.bindToCollection("modelBinders", UrlInputModelBinder);
        injector.bindToCollection("viewModelBinders", UrlInputViewModelBinder);
    }
}