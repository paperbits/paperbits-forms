import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { SubmitModel } from "./submitModel";


export class SubmitHandlers implements IWidgetHandler<SubmitModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<SubmitModel>> {
        const widgetOrder: IWidgetOrder<SubmitModel> = {
            name: "submit",
            category: "Forms",
            displayName: "Submit form button",
            iconClass: "widget-icon widget-icon-submit-form-button",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new SubmitModel();
            }
        };

        return widgetOrder;
    }
}