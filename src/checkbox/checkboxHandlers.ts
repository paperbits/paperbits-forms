import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { CheckboxModel } from "./checkboxModel";


export class CheckboxHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:checkbox",
            category: "Forms",
            displayName: "Checkbox",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new CheckboxModel();
            }
        };

        return widgetOrder;
    }
}