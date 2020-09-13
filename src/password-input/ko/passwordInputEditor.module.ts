import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { PasswordInputEditor } from "./passwordInputEditor";
import { PasswordInputHandlers } from "../passwordInputHandlers";

export class PasswordInputEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("passwordInputEditor", PasswordInputEditor);
        injector.bindToCollection("widgetHandlers", PasswordInputHandlers, "passwordInputHandler");
    }
}