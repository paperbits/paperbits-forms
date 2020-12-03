import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { RangeInputModel } from "./rangeInputModel";


export class RangeInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:range",
            category: "Forms",
            displayName: "Range input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new RangeInputModel();
            }
        };

        return widgetOrder;
    }
}