import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { SelectEditor } from "./ko/selectInputEditor";
import { SelectHandlers } from "./selectHandlers";

export class SelectInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("selectEditor", SelectEditor);
        injector.bindToCollection("widgetHandlers", SelectHandlers, "selectHandler");
    }
}