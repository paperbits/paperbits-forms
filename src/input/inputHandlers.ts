import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { InputModel } from ".";

export class InputHandlers implements IWidgetHandler {
    private readonly inputType: string;

    constructor(inputType: string) {
        this.inputType = inputType;
    }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input",
            displayName: `Input ${this.inputType}`,
            iconClass: "paperbits-form",
            requires: ["form"],
            createModel: async () => {
                const inputModel = new InputModel();
                inputModel.inputType = "text";
                inputModel.labelText = "Label";
                inputModel.inputName = "input";
                inputModel.showLabel = "before";
                inputModel.placeholderText = "e.g. Text";
                inputModel.isRequired = false;

                return inputModel;
            }
        };

        return widgetOrder;
    }
}