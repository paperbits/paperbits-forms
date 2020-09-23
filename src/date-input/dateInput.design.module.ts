import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { DateInputEditor } from "./ko/dateInputEditor";
import { DateInputHandlers } from "./dateInputHandlers";

export class DateInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("dateInputEditor", DateInputEditor);
        injector.bindToCollection("widgetHandlers", DateInputHandlers, "dateInputHandler");
    }
}