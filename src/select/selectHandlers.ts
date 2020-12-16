import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { SelectInputModel } from "./selectInputModel";


export class SelectHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:select",
            category: "Forms",
            displayName: "Select input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new SelectInputModel();
            }
        };

        return widgetOrder;
    }
}