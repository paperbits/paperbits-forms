import { IModelBinder } from "@paperbits/common/editing";
import { RangeInputModel } from "./rangeInputModel";
import { Contract } from "@paperbits/common";
import { RangeInputContract } from "./rangeInputContract";


export class RangeInputModelBinder implements IModelBinder<RangeInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:range";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof RangeInputModel;
    }

    public async contractToModel(contract: RangeInputContract): Promise<RangeInputModel> {
        const model = new RangeInputModel();
        model.label = contract.label;
        model.name = contract.name;
        model.minValue = contract.minValue;
        model.maxValue = contract.maxValue;
        model.value = contract.value;
        model.readonly = contract.readonly;

        return model;
    }

    public modelToContract(model: RangeInputModel): Contract {
        const contract: RangeInputContract = {
            type: "input:range",
            label: model.label,
            name: model.name,
            minValue: model.minValue,
            maxValue: model.maxValue,
            value: model.value,
            readonly: model.readonly,
            styles: model.styles
        };

        return contract;
    }
}