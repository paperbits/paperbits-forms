import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { TextareaModelBinder, TextareaHandlers } from ".";
import { TextareaViewModelBinder, TextareaEditor } from "./ko";

export class TextareaModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        //modelBinders
        injector.bind("textareaModelBinder", TextareaModelBinder);        
        this.modelBinders.push(injector.resolve("textareaModelBinder"));

        //viewModelBinders
        injector.bind("textareaViewModelBinder", TextareaViewModelBinder);
        this.viewModelBinders.push(injector.resolve("textareaViewModelBinder"));

        //editors
        injector.bind("textareaEditor", TextareaEditor);

        //handlers
        injector.bindSingleton("textareaHandlers", TextareaHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");        
        widgetHandlers.push(injector.resolve<TextareaHandlers>("textareaHandlers"));
    }
}