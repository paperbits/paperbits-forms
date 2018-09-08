import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormEditorModule } from "./form/ko/formEditor.module";
import { InputEditorModule } from "./input/ko/inputEditor.module";

export class FormsEditModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormEditorModule());
        injector.bindModule(new InputEditorModule());
    }
}