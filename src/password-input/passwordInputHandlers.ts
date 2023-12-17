import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { PasswordInputModel } from "./passwordInputModel";


export class PasswordInputHandlers implements IWidgetHandler<PasswordInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<PasswordInputModel>> {
        const widgetOrder: IWidgetOrder<PasswordInputModel> = {
            name: "input:password",
            category: "Forms",
            displayName: "Password input",
            iconClass: "widget-icon widget-icon-password-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new PasswordInputModel();
            }
        };

        return widgetOrder;
    }
}