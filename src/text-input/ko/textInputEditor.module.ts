import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IStyleGroup } from "@paperbits/common/styles";
import { TextInputEditor } from "./textInputEditor";
import { TextInputHandlers } from "../textInputHandlers";
import styleTemplate from "./styleGuideSnippet.html";

export class TextInputEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("textInputEditor", TextInputEditor);
        injector.bindToCollection("widgetHandlers", TextInputHandlers, "textInputHandler");

        const styleGroup: IStyleGroup = {
            key: "formGroup",
            name: "components_formGroup",
            groupName: "Form",
            styleTemplate: styleTemplate
        };

        injector.bindInstanceToCollection("styleGroups", styleGroup);
    }
}