import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { UrlInputModel } from "./urlInputModel";


export class UrlInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:url",
            category: "Forms",
            displayName: "URL input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new UrlInputModel();
            }
        };

        return widgetOrder;
    }
}