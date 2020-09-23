import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { TimeInputEditor } from "./ko/timeInputEditor";
import { TimeInputHandlers } from "./timeInputHandlers";

export class TimeInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("timeInputEditor", TimeInputEditor);
        injector.bindToCollection("widgetHandlers", TimeInputHandlers, "timeInputHandler");
    }
}