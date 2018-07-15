import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { InputModel, InputType } from '.';

export class InputHandlers implements IWidgetHandler {
    private readonly inputType: InputType;

    constructor(inputType: InputType) {
        this.inputType = inputType;
    }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "input",
            displayName: `Input ${this.inputType}`,
            iconClass: "paperbits-form",
            requires: ["form"],
            createModel: async () => {
                const defaultModel = new InputModel(this.inputType);
                if(this.inputType === "radio") {
                    defaultModel.options = [                        
                        { itemName: "First option", itemValue:"optionFirst" },
                        { itemName: "Second option", itemValue:"optionSecond" },
                        { itemName: "Third option", itemValue:"optionThird" }
                    ];
                }
                return defaultModel;
            }
        };

        return widgetOrder;
    }
}