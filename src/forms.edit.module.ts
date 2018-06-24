import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormEditorModule } from "./form/ko/formEditor.module";
import { InputEditorModule } from "./input/ko/inputEditor.module";
import { TextareaEditorModule } from "./textarea/ko/textareaEditor.module";
import { SelectEditorModule } from "./select/ko/selectEditor.module";

export class FormsEditModule implements IInjectorModule {
    register(injector: IInjector): void {
        injector.bindModule(new FormEditorModule());
        injector.bindModule(new InputEditorModule());
        injector.bindModule(new SelectEditorModule());
        injector.bindModule(new TextareaEditorModule());
    }
}