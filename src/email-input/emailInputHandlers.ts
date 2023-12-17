import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { EmailInputModel } from "./emailInputModel";


export class EmailInputHandlers implements IWidgetHandler<EmailInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<EmailInputModel>> {
        const widgetOrder: IWidgetOrder<EmailInputModel> = {
            name: "input:email",
            category: "Forms",
            displayName: "Email input",
            iconClass: "widget-icon widget-icon-email-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new EmailInputModel();
            }
        };

        return widgetOrder;
    }
}