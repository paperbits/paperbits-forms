import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { FormEditorModule } from "./form/ko/formEditor.module";
import { InputEditorModule } from "./input/ko/inputEditor.module";
import { TextareaEditorModule } from "./textarea/ko/textareaEditor.module";
import { SelectEditorModule } from "./select/ko/selectEditor.module";

export class FormsEditModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        injector.bindModule(new FormEditorModule(this.modelBinders, this.viewModelBinders));
        injector.bindModule(new InputEditorModule(this.modelBinders, this.viewModelBinders));
        injector.bindModule(new SelectEditorModule(this.modelBinders, this.viewModelBinders));
        injector.bindModule(new TextareaEditorModule(this.modelBinders, this.viewModelBinders));
    }
}