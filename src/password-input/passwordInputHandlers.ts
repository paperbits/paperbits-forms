import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { PasswordInputModel } from "./passwordInputModel";


export class PasswordInputHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input:password",
            displayName: "Password input",
            iconClass: "paperbits-passwordInput-2",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new PasswordInputModel();
            }
        };

        return widgetOrder;
    }
}