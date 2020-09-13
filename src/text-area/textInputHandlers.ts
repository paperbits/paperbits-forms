import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { TextInputModel } from "./textInputModel";


export class TextInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:text",
            displayName: "Text input",
            iconClass: "paperbits-textInput-2",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new TextInputModel();
            }
        };

        return widgetOrder;
    }
}