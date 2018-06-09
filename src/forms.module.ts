import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { FormModule } from "./form/ko/form.module";
import { InputModule } from "./input/ko/input.module";
import { SelectModule } from "./select/ko/select.module";
import { TextareaModule } from "./textarea/ko/textarea.module";

export class FormsModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        injector.bindModule(new FormModule(this.modelBinders, this.viewModelBinders));
        injector.bindModule(new InputModule(this.modelBinders, this.viewModelBinders));
        injector.bindModule(new SelectModule(this.modelBinders, this.viewModelBinders));
        injector.bindModule(new TextareaModule(this.modelBinders, this.viewModelBinders));
    }
}