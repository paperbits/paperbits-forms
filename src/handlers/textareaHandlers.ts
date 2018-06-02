import * as ko from "knockout";
import { IWidgetOrder } from '@paperbits/common/editing';
import { IWidgetHandler } from '@paperbits/common/editing';
import { IViewManager } from "@paperbits/common/ui/IViewManager";
import { TextareaModelBinder } from "../modelBinders/textareaModelBinder";
import { TextareaContract } from "../contracts/textareaContract";

export class TextareaHandlers implements IWidgetHandler {
    private readonly textareaModelBinder: TextareaModelBinder;

    constructor(textareaModelBinder: TextareaModelBinder) {
        this.textareaModelBinder = textareaModelBinder;
    }

    private async prepareWidgetOrder(config: TextareaContract): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "textarea",
            displayName: "Textarea",
            iconClass: "paperbits-form",
            createModel: async () => {
                return await this.textareaModelBinder.nodeToModel(config);
            }
        }

        return widgetOrder;
    }

    private async getWidgetOrderByConfig(): Promise<IWidgetOrder> {
        let config: TextareaContract = {
            object: "block",
            type: "textarea",
            label: "Textarea",
            style: "default"
        }
        return await this.prepareWidgetOrder(config);
    }

    public getWidgetOrder(): Promise<IWidgetOrder> {
        return Promise.resolve(this.getWidgetOrderByConfig());
    }
}