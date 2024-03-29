﻿import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { TextInputModel } from "./textInputModel";


export class TextInputHandlers implements IWidgetHandler<TextInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<TextInputModel>> {
        const widgetOrder: IWidgetOrder<TextInputModel> = {
            name: "input:text",
            displayName: "Text input",
            category: "Forms",
            iconClass: "widget-icon widget-icon-text-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                const model = new TextInputModel();
                model.invalidFeedback = "Invalid value";
                return model;
            }
        };

        return widgetOrder;
    }
}