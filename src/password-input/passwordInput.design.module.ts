import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PasswordInputEditor } from "./ko/passwordInputEditor";
import { PasswordInputHandlers } from "./passwordInputHandlers";

export class PasswordInputDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("passwordInputEditor", PasswordInputEditor);
        injector.bindToCollection("widgetHandlers", PasswordInputHandlers, "passwordInputHandler");
    }
}