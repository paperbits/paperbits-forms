﻿import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { SelectInputModel } from "./selectInputModel";


export class SelectHandlers implements IWidgetHandler<SelectInputModel> {
    public async getWidgetOrder(): Promise<IWidgetOrder<SelectInputModel>> {
        const widgetOrder: IWidgetOrder<SelectInputModel> = {
            name: "input:select",
            category: "Forms",
            displayName: "Select input",
            iconClass: "widget-icon widget-icon-select-input",
            requires: ["form", "html", "js"],
            createModel: async () => {
                return new SelectInputModel();
            }
        };

        return widgetOrder;
    }
}