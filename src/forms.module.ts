import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { FormModule } from "./form/form.module";
import { InputModule } from "./input/input.module";
import { SelectModule } from "./select/select.module";
import { TextareaModule } from "./textarea/textarea.module";

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