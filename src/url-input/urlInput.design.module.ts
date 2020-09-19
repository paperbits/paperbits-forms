import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { UrlInputEditor } from "./ko/urlInputEditor";
import { UrlInputHandlers } from "./urlInputHandlers";

export class UrlInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("urlInputEditor", UrlInputEditor);
        injector.bindToCollection("widgetHandlers", UrlInputHandlers, "urlInputHandler");
    }
}