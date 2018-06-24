import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IWidgetHandler } from "@paperbits/common/editing";
import { TextareaEditor } from "./textareaEditor";
import { TextareaHandlers } from "../textareaHandlers";

export class TextareaEditorModule implements IInjectorModule {
    register(injector: IInjector): void {
        //editors
        injector.bind("textareaEditor", TextareaEditor);

        //handlers
        injector.bindSingleton("textareaHandlers", TextareaHandlers);

        const widgetHandlers:Array<IWidgetHandler> = injector.resolve("widgetHandlers");        
        widgetHandlers.push(injector.resolve<TextareaHandlers>("textareaHandlers"));
    }
}