import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { FormModule } from "./form/ko/form.module";
import { InputModule } from "./input/ko/input.module";

export class FormsModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindModule(new FormModule());
        injector.bindModule(new InputModule());
    }
}