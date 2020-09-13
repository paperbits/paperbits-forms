import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IStyleGroup } from "@paperbits/common/styles";
import { TextInputEditor } from "./textInputEditor";
import { TextInputHandlers } from "../textInputHandlers";

export class TextInputEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("textInputEditor", TextInputEditor);
        injector.bindToCollection("widgetHandlers", TextInputHandlers, "textInputHandler");
    }
}