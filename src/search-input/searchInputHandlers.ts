import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { SearchInputModel } from "./searchInputModel";


export class SearchInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:search",
            category: "Forms",
            displayName: "Search input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new SearchInputModel();
            }
        };

        return widgetOrder;
    }
}