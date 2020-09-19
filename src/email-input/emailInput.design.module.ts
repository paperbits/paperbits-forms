import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { EmailInputEditor } from "./ko/emailInputEditor";
import { EmailInputHandlers } from "./emailInputHandlers";

export class EmailInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("emailInputEditor", EmailInputEditor);
        injector.bindToCollection("widgetHandlers", EmailInputHandlers, "emailInputHandler");
    }
}