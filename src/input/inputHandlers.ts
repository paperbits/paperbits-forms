import { IWidgetOrder } from '@paperbits/common/editing';
import { IWidgetHandler } from '@paperbits/common/editing';
import { IViewManager } from "@paperbits/common/ui/IViewManager";
import { InputModelBinder, InputContract } from '.';

export class InputHandlers implements IWidgetHandler {
    private readonly inputModelBinder: InputModelBinder;
    private readonly inputType: string;

    constructor(inputModelBinder: InputModelBinder, inputType: string) {
        this.inputModelBinder = inputModelBinder;
        this.inputType = inputType;
    }

    private async prepareWidgetOrder(config: InputContract): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input",
            displayName: `Input ${this.inputType}`,
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
            inputType: this.inputType
        }
        return await this.prepareWidgetOrder(config);
    }

    public getWidgetOrder(): Promise<IWidgetOrder> {
        return Promise.resolve(this.getWidgetOrderByConfig());
    }
}