import { IModelBinder } from "@paperbits/common/editing";
import { MultilineInputModel } from "./multilineInputModel";
import { Contract } from "@paperbits/common";
import { MultilineInputContract } from "./multilineInputContract";


export class MultilineInputModelBinder implements IModelBinder<MultilineInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:multiline";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof MultilineInputModel;
    }

    public async contractToModel(contract: MultilineInputContract): Promise<MultilineInputModel> {
        const model = new MultilineInputModel();
        model.label = contract.label;
        model.placeholder = contract.placeholder;
        model.name = contract.name;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.maxLength = contract.maxLength;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: MultilineInputModel): Contract {
        const contract: MultilineInputContract = {
            type: "input:multiline",
            label: model.label,
            name: model.name,
            readonly: model.readonly,
            required: model.required,
            maxLength: model.maxLength,
            placeholder: model.placeholder,
            styles: model.styles
        };

        return contract;
    }
}