/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { InputModel, InputContract } from ".";
import { Contract } from "@paperbits/common";


interface InputModelRegistration {
    inputType: string;
    inputClass: new () => InputModel;
}

export class GenericInputModelBinder implements IModelBinder {
    private excludeNames = ["type", "object", "inputType", "inputProperties", "options"];
    private inputs: InputModelRegistration[];

    constructor() {
        this.inputs = [];
    }

    public registerInput(inputType: string, inputModelClass: new () => InputModel): void {
        this.inputs.push({ inputType: inputType, inputClass: inputModelClass });
    }

    public canHandleContract(contract: Contract): boolean {
        return this.inputs.some(x => x.inputType === contract.type);
    }

    public canHandleModel(model: InputModel): boolean {
        return this.inputs.some(x => model instanceof x.inputClass);
    }

    public async contractToModel(contract: InputContract): Promise<InputModel> {
        const record = this.inputs.find(x => x.inputType === contract.type);
        const model = new record.inputClass();

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
        const registration = this.inputs.find(x => model instanceof x.inputClass);

        const contract: InputContract = {
            type: registration.inputType,
            inputProperties: []
        };

        // for (const key of Object.keys(model)) {
        //     contract[key] = model[key];
        // }

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