import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { FormEditor } from "./formEditor";
import { FormHandlers } from "../formHandlers";
import { FormModule } from "./form.module";

export class FormEditorModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {        
        injector.bindModule(new FormModule(this.modelBinders, this.viewModelBinders));

        //editors
        injector.bind("formEditor", FormEditor);

        //handlers
        injector.bindSingleton("formHandlers", FormHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");        
        widgetHandlers.push(injector.resolve<FormHandlers>("formHandlers"));
    }
}