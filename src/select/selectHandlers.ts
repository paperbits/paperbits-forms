import { IWidgetOrder } from '@paperbits/common/editing';
import { IWidgetHandler } from '@paperbits/common/editing';
import { IViewManager } from "@paperbits/common/ui/IViewManager";
import { SelectModelBinder, SelectContract } from '.';

export class SelectHandlers implements IWidgetHandler {
    private readonly selectModelBinder: SelectModelBinder;

    constructor(selectModelBinder: SelectModelBinder) {
        this.selectModelBinder = selectModelBinder;
    }

    private async prepareWidgetOrder(config: SelectContract): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "select",
            displayName: "Select",
            iconClass: "paperbits-form",
            requires: ["form"],
            createModel: async () => {
                return await this.selectModelBinder.nodeToModel(config);
            }
        }

        return widgetOrder;
    }

    private async getWidgetOrderByConfig(): Promise<IWidgetOrder> {
        let config: SelectContract = {
            object: "block",
            type: "select",
            label: "Select",
            style: "default",
            optionsList: []
        }
        return await this.prepareWidgetOrder(config);
    }

    public getWidgetOrder(): Promise<IWidgetOrder> {
        return Promise.resolve(this.getWidgetOrderByConfig());
    }
}