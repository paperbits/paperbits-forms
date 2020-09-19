import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { SearchInputEditor } from "./ko/searchInputEditor";
import { SearchInputHandlers } from "./searchInputHandlers";

export class SearchInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("searchInputEditor", SearchInputEditor);
        injector.bindToCollection("widgetHandlers", SearchInputHandlers, "searchInputHandler");
    }
}