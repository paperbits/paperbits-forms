import { IModelBinder } from "@paperbits/common/editing";
import { TextInputModel } from "./textInputModel";
import { Contract } from "@paperbits/common";
import { TextInputContract } from "./textInputContract";


export class TextInputModelBinder implements IModelBinder<TextInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:text";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof TextInputModel;
    }

    public async contractToModel(contract: TextInputContract): Promise<TextInputModel> {
        const model = new TextInputModel();
        model.name = contract.name;
        model.label = contract.label;
        model.placeholder = contract.placeholder;
        model.value = contract.value;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.maxLength = contract.maxLength;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: TextInputModel): Contract {
        const contract: TextInputContract = {
            type: "input:text",
            label: model.label,
            name: model.name,
            value: model.value,
            readonly: model.readonly,
            required: model.required,
            maxLength: model.maxLength,
            placeholder: model.placeholder,
            styles: model.styles
        };

        return contract;
    }
}