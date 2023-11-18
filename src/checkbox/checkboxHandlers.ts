import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { CheckboxModel } from "./checkboxModel";


export class CheckboxHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:checkbox",
            category: "Forms",
            displayName: "Checkbox",
            iconClass: "widget-icon widget-icon-checkbox",
            requires: ["form", "html", "js"],
            createModel: async () => {
                const model = new CheckboxModel();
                model.invalidFeedback = "Invalid value";
                return model;
            }
        };

        return widgetOrder;
    }
}