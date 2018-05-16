import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";

import { FormModelBinder, InputModelBinder, SelectModelBinder, TextareaModelBinder } from "./modelBinders";
import { FormHandlers, InputHandlers, SelectHandlers, TextareaHandlers } from "./handlers";

import { FormViewModelBinder, FormEditor } from "./knockout/form";
import { InputViewModelBinder, InputEditor } from "./knockout/Input";
import { SelectViewModelBinder, SelectEditor } from "./knockout/Select";
import { TextareaViewModelBinder, TextareaEditor } from "./knockout/Textarea";

export class FormsModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        //modelBinders
        injector.bind("formModelBinder", FormModelBinder);        
        this.modelBinders.push(injector.resolve("formModelBinder"));

        injector.bind("inputModelBinder", InputModelBinder);        
        this.modelBinders.push(injector.resolve("inputModelBinder"));

        injector.bind("selectModelBinder", SelectModelBinder);        
        this.modelBinders.push(injector.resolve("selectModelBinder"));

        injector.bind("textareaModelBinder", TextareaModelBinder);        
        this.modelBinders.push(injector.resolve("textareaModelBinder"));

        //viewModelBinders
        injector.bind("formViewModelBinder", FormViewModelBinder);
        this.viewModelBinders.push(injector.resolve("formViewModelBinder"));

        injector.bind("inputViewModelBinder", InputViewModelBinder);
        this.viewModelBinders.push(injector.resolve("inputViewModelBinder"));

        injector.bind("selectViewModelBinder", SelectViewModelBinder);
        this.viewModelBinders.push(injector.resolve("selectViewModelBinder"));

        injector.bind("textareaViewModelBinder", TextareaViewModelBinder);
        this.viewModelBinders.push(injector.resolve("textareaViewModelBinder"));

        //editors
        injector.bind("formEditor", FormEditor);
        injector.bind("inputEditor", InputEditor);
        injector.bind("selectEditor", SelectEditor);
        injector.bind("textareaEditor", TextareaEditor);

        //handlers
        injector.bindSingleton("formHandlers", FormHandlers);
        injector.bindSingleton("inputHandlers", InputHandlers);
        injector.bindSingleton("selectHandlers", SelectHandlers);
        injector.bindSingleton("textareaHandlers", TextareaHandlers);

        // const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");        
        // widgetHandlers.push(injector.resolve<FormHandlers>("formHandlers"));
        // widgetHandlers.push(injector.resolve<InputHandlers>("inputHandlers"));
        // widgetHandlers.push(injector.resolve<SelectHandlers>("selectHandlers"));
        // widgetHandlers.push(injector.resolve<TextareaHandlers>("textareaHandlers"));
    }
}