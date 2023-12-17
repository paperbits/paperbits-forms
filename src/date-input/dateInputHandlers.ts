import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { DateInputModel } from "./dateInputModel";


export class DateInputHandlers implements IWidgetHandler<DateInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<DateInputModel>> {
        const widgetOrder: IWidgetOrder<DateInputModel> = {
            name: "input:date",
            category: "Forms",
            displayName: "Date input",
            iconClass: "widget-icon widget-icon-date-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new DateInputModel();
            }
        };

        return widgetOrder;
    }
}