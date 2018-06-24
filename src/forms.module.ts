import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormModule } from "./form/ko/form.module";
import { InputModule } from "./input/ko/input.module";
import { SelectModule } from "./select/ko/select.module";
import { TextareaModule } from "./textarea/ko/textarea.module";

export class FormsModule implements IInjectorModule {
    register(injector: IInjector): void {
        injector.bindModule(new FormModule());
        injector.bindModule(new InputModule());
        injector.bindModule(new SelectModule());
        injector.bindModule(new TextareaModule());
    }
}