import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { EmailInputModel } from "./emailInputModel";


export class EmailInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:email",
            displayName: "Email input",
            iconClass: "paperbits-emailInput-2",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new EmailInputModel();
            }
        };

        return widgetOrder;
    }
}