import * as ko from "knockout";
import { IWidgetOrder } from '@paperbits/common/editing';
import { IWidgetHandler } from '@paperbits/common/editing';
import { IViewManager } from "@paperbits/common/ui/IViewManager";
import { InputModelBinder } from "../modelBinders/inputModelBinder";
import { InputContract } from "../contracts/inputContract";

export class InputHandlers implements IWidgetHandler {
    private readonly inputModelBinder: InputModelBinder;

    constructor(inputModelBinder: InputModelBinder) {
        this.inputModelBinder = inputModelBinder;
    }

    private async prepareWidgetOrder(config: InputContract): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input",
            displayName: "Input",
            iconClass: "paperbits-form",
            createModel: async () => {
                return await this.inputModelBinder.nodeToModel(config);
            }
        }

        return widgetOrder;
    }

    private async getWidgetOrderByConfig(): Promise<IWidgetOrder> {
        let config: InputContract = {
            object: "block",
            type: "input",
            label: "Input",
            style: "default",
            inputType: "text"
        }
        return await this.prepareWidgetOrder(config);
    }

    public getWidgetOrder(): Promise<IWidgetOrder> {
        return Promise.resolve(this.getWidgetOrderByConfig());
    }
}