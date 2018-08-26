import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { InputModel } from ".";

export class InputHandlers implements IWidgetHandler {
    private readonly input: InputModel;

    constructor(input: InputModel) {
        this.input = input;
    }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input",
            displayName: `Input ${this.input.inputType}`,
            iconClass: "paperbits-form",
            requires: ["form"],
            createModel: async () => {
                return this.input;
            }
        };

        return widgetOrder;
    }
}