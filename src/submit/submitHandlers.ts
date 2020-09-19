import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { SubmitModel } from "./submitModel";


export class SubmitHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "submit",
            category: "Forms",
            displayName: "Submit form button",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new SubmitModel();
            }
        };

        return widgetOrder;
    }
}