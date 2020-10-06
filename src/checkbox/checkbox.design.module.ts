import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { CheckboxEditor } from "./ko/checkboxEditor";
import { CheckboxHandlers } from "./checkboxHandlers";

export class CheckboxDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("checkboxEditor", CheckboxEditor);
        injector.bindToCollection("widgetHandlers", CheckboxHandlers, "checkboxHandler");
    }
}