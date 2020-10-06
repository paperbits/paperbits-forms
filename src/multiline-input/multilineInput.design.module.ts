import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { MultilineInputEditor } from "./ko/multilineInputEditor";
import { MultilineInputHandlers } from "./multilineInputHandlers";

export class MultilineInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("multilineInputEditor", MultilineInputEditor);
        injector.bindToCollection("widgetHandlers", MultilineInputHandlers, "multilineInputHandler");
    }
}