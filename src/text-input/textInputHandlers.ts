import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { TextInputModel } from "./textInputModel";


export class TextInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:text",
            displayName: "Text input",
            category: "Forms",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new TextInputModel();
            }
        };

        return widgetOrder;
    }
}