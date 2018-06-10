import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IModelBinder, IWidgetHandler } from "@paperbits/common/editing";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { TextareaModelBinder } from "../textareaModelBinder";
import { TextareaViewModelBinder } from "./textareaViewModelBinder";
import { TextareaEditor } from "./textareaEditor";
import { TextareaHandlers } from "../textareaHandlers";
import { TextareaModule } from "./textarea.module";

export class TextareaEditorModule implements IInjectorModule {
    constructor(
        private modelBinders:any,
        private viewModelBinders:Array<IViewModelBinder<any, any>>,
    ) { }

    register(injector: IInjector): void {
        injector.bindModule(new TextareaModule(this.modelBinders, this.viewModelBinders));

        //editors
        injector.bind("textareaEditor", TextareaEditor);

        //handlers
        injector.bindSingleton("textareaHandlers", TextareaHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");        
        widgetHandlers.push(injector.resolve<TextareaHandlers>("textareaHandlers"));
    }
}