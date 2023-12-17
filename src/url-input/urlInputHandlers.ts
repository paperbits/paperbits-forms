import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { UrlInputModel } from "./urlInputModel";


export class UrlInputHandlers implements IWidgetHandler<UrlInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<UrlInputModel>> {
        const widgetOrder: IWidgetOrder<UrlInputModel> = {
            name: "input:url",
            category: "Forms",
            displayName: "URL input",
            iconClass: "widget-icon widget-icon-url-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new UrlInputModel();
            }
        };

        return widgetOrder;
    }
}