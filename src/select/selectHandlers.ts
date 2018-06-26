import { IWidgetOrder } from '@paperbits/common/editing';
import { IWidgetHandler } from '@paperbits/common/editing';
import { SelectModel } from './selectModel';

export class SelectHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "select",
            displayName: "Select",
            iconClass: "paperbits-form",
            requires: ["form"],
            createModel: async () => {
                const selectModel = new SelectModel();
                selectModel.labelText = "Label";
                selectModel.selectName = "select";
                selectModel.showLabel = "before";
                selectModel.isRequired = false;

                return selectModel;
            }
        }

        return widgetOrder;
    }
}