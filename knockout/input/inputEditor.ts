import * as ko from "knockout";
import template from "./inputEditor.html";
import { IViewManager } from '@paperbits/common/ui';
import { IWidgetEditor } from '@paperbits/common/widgets';
import { Component } from "@paperbits/knockout/decorators/component";
import { InputModel } from "../../models";

@Component({
    selector: "input-editor",
    template: template,
    injectable: "inputEditor"
})
export class InputEditor implements IWidgetEditor {
    private inputModel: InputModel;
    private applyChangesCallback: () => void;

    constructor(private viewManager: IViewManager) {

    }

    public setWidgetModel(model: InputModel, applyChangesCallback?: () => void): void {
        
    }

    public closeEditor(): void {
        this.viewManager.closeWidgetEditor();
    }
}