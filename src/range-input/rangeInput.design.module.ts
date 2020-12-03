import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { RangeInputEditor } from "./ko/rangeInputEditor";
import { RangeInputHandlers } from "./rangeInputHandlers";

export class RangeInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("rangeInputEditor", RangeInputEditor);
        injector.bindToCollection("widgetHandlers", RangeInputHandlers, "rangeInputHandler");
    }
}