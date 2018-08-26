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

    public async contractToModel(contract: InputContract): Promise<InputModel> {
        const model = new InputModel(<any>contract.inputType);

        if (contract.inputProperties && contract.inputProperties.length > 0) {
            for (const item of contract.inputProperties) {
                model.setProperty(item.propertyName, item.propertyValue);
            }
        }

        if (contract.options && contract.options.length > 0) {
            for (const item of contract.options) {
                model.options.push({
                    itemName: item.itemName,
                    itemValue: item.itemValue
                });
            }
        }

        // convert old data to a new data structure
        for (const propertyName in contract) {
            if (this.excludeNames.indexOf(propertyName) === -1) {
                if (contract.hasOwnProperty(propertyName)) {
                    const propertyValue = contract[propertyName];
                    
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

        if (model.properties && model.properties.length > 0) {
            for (const item of model.properties) {
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