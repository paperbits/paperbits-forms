import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { NumberInputEditor } from "./ko/numberInputEditor";
import { NumberInputHandlers } from "./numberInputHandlers";

export class NumberInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("numberInputEditor", NumberInputEditor);
        injector.bindToCollection("widgetHandlers", NumberInputHandlers, "numberInputHandler");
    }
}