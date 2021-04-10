import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { MultilineInputModel } from "./multilineInputModel";


export class MultilineInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:multiline",
            category: "Forms",
            displayName: "Multi-line input",
            iconClass: "widget-icon widget-icon-multi-line-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new MultilineInputModel();
            }
        };

        return widgetOrder;
    }
}