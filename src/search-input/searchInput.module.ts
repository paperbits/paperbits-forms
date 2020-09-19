import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { SearchInput } from "./ko/searchInput";
import { SearchInputModelBinder } from "./searchInputModelBinder";
import { SearchInputViewModelBinder } from "./ko/searchInputViewModelBinder";


export class SearchInputModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("searchInput", SearchInput);
        injector.bindToCollection("modelBinders", SearchInputModelBinder);
        injector.bindToCollection("viewModelBinders", SearchInputViewModelBinder);
    }
}