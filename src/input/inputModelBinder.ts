import { IModelBinder } from "@paperbits/common/editing";
import { InputModel, InputContract } from ".";

export class InputModelBinder implements IModelBinder {
    private excludeNames = ["type", "object", "inputType", "inputProperties", "options"];

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "input";
    }

    public canHandleModel(model): boolean {
        return model instanceof InputModel;
    }

    public async contractToModel(node: InputContract): Promise<InputModel> {
        const model = new InputModel(<any>node.inputType);

        if (node.inputProperties && node.inputProperties.length > 0) {
            for (const item of node.inputProperties) {
                model.setProperty(item.propertyName, item.propertyValue);
            }
        }

        if (node.options && node.options.length > 0) {
            for (const item of node.options) {
                model.options.push({
                    itemName: item.itemName,
                    itemValue: item.itemValue
                });
            }
        }

        // convert old data to a new data structure
        for (const propertyName in node) {
            if (this.excludeNames.indexOf(propertyName) === -1) {
                if (node.hasOwnProperty(propertyName)) {
                    const propertyValue = node[propertyName];
                    if (propertyValue) {
                        model.setProperty(propertyName, propertyValue);
                    }
                }
            }

        }

        return model;
    }

    public modelToContract(model: InputModel): InputContract {
        const contract: InputContract = {
            object: "block",
            type: "input",
            inputType: model.inputType,
            inputProperties: []
        };

        if (model.inputProperties && model.inputProperties.length > 0) {
            for (const item of model.inputProperties) {
                contract.inputProperties.push({
                    propertyName: item.propertyName,
                    propertyValue: item.propertyValue
                });
            }
        }

        if (model.options && model.options.length > 0) {
            contract.options = [];

            for (const item of model.options) {
                contract.options.push({
                    itemName: item.itemName,
                    itemValue: item.itemValue
                });
            }
        }

        return contract;
    }
}