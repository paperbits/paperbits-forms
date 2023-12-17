import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { TimeInputModel } from "./timeInputModel";


export class TimeInputHandlers implements IWidgetHandler<TimeInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<TimeInputModel>> {
        const widgetOrder: IWidgetOrder<TimeInputModel> = {
            name: "input:time",
            category: "Forms",
            displayName: "Time input",
            iconClass: "widget-icon widget-icon-time-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new TimeInputModel();
            }
        };

        return widgetOrder;
    }
}