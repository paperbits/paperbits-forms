import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { PasswordInputModel } from "./passwordInputModel";


export class PasswordInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:password",
            category: "Forms",
            displayName: "Password input",
            iconClass: "paperbits-form",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new PasswordInputModel();
            }
        };

        return widgetOrder;
    }
}