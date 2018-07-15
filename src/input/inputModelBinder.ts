import { IModelBinder } from "@paperbits/common/editing";
import { InputModel, InputContract } from ".";
import { InputProperty } from "./inputModel";

export class InputModelBinder implements IModelBinder {
    private excludeNames = ["type", "object", "inputType", "inputProperties", "options"];

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "input";
    }

    public canHandleModel(model): boolean {
        return model instanceof InputModel;
    }

    public async nodeToModel(node: InputContract): Promise<InputModel> {
        let model = new InputModel(<any>node.inputType);

        if (node.inputProperties && node.inputProperties.length > 0) {
            for (let i = 0; i < node.inputProperties.length; i++) {
                const item = node.inputProperties[i];
                model.setProperty(item.propertyName,item.propertyValue);                
            }
        }

        if (node.options && node.options.length > 0) {
            for (let i = 0; i < node.options.length; i++) {
                const item = node.options[i];
                model.options.push({
                    itemName: item.itemName,
                    itemValue: item.itemValue
                });                
            }
        }

        //convert old data to a new data structure
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

    public getConfig(model: InputModel): InputContract {
        let contract: InputContract = {
            object: "block",
            type: "input",
            inputType : model.inputType,
            inputProperties: []
        };

        if (model.inputProperties && model.inputProperties.length > 0) {
            for (let i = 0; i < model.inputProperties.length; i++) {
                const item = model.inputProperties[i];
                
                contract.inputProperties.push({
                    propertyName: item.propertyName,
                    propertyValue: item.propertyValue
                });
            }
        }

        if (model.options && model.options.length > 0) {
            contract.options = [];
            for (let i = 0; i < model.options.length; i++) {
                const item = model.options[i];
                
                contract.options.push({
                    itemName: item.itemName,
                    itemValue: item.itemValue
                });
            }
        }

        return contract;
    }
}