import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IStyleGroup } from "@paperbits/common/styles";
import { SubmitEditor } from "./submitEditor";
import { SubmitHandlers } from "../submitHandlers";

export class SubmitEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("submitEditor", SubmitEditor);
        injector.bindToCollection("widgetHandlers", SubmitHandlers, "submitHandler");
    }
}