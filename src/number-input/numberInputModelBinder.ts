import { IModelBinder } from "@paperbits/common/editing";
import { NumberInputModel } from "./numberInputModel";
import { Contract } from "@paperbits/common";
import { NumberInputContract } from "./numberInputContract";


export class NumberInputModelBinder implements IModelBinder<NumberInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:number";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof NumberInputModel;
    }

    public async contractToModel(contract: NumberInputContract): Promise<NumberInputModel> {
        const model = new NumberInputModel();
        model.label = contract.label;
        model.placeholder = contract.placeholder;
        model.name = contract.name;
        model.value = contract.value;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.min = contract.min;
        model.max = contract.max;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: NumberInputModel): Contract {
        const contract: NumberInputContract = {
            type: "input:number",
            label: model.label,
            name: model.name,
            value: model.value,
            readonly: model.readonly,
            required: model.required,
            min: model.min,
            max: model.max,
            placeholder: model.placeholder,
            styles: model.styles
        };

        return contract;
    }
}