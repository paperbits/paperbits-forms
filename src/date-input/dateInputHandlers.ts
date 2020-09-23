import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { DateInputModel } from "./dateInputModel";


export class DateInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:date",
            category: "Forms",
            displayName: "Date input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new DateInputModel();
            }
        };

        return widgetOrder;
    }
}