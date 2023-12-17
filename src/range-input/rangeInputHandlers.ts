import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { RangeInputModel } from "./rangeInputModel";


export class RangeInputHandlers implements IWidgetHandler<RangeInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<RangeInputModel>> {
        const widgetOrder: IWidgetOrder<RangeInputModel> = {
            name: "input:range",
            category: "Forms",
            displayName: "Range input",
            iconClass: "widget-icon widget-icon-range-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new RangeInputModel();
            }
        };

        return widgetOrder;
    }
}