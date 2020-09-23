import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { TimeInputModel } from "./timeInputModel";


export class TimeInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:time",
            category: "Forms",
            displayName: "Time input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new TimeInputModel();
            }
        };

        return widgetOrder;
    }
}