import { IModelBinder } from "@paperbits/common/editing";
import { PasswordInputModel } from "./passwordInputModel";
import { Contract } from "@paperbits/common";
import { PasswordInputContract } from "./passwordInputContract";


export class PasswordInputModelBinder implements IModelBinder<PasswordInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        console.log(contract.type);
        return contract.type === "input:password";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof PasswordInputModel;
    }

    public async contractToModel(contract: PasswordInputContract): Promise<PasswordInputModel> {
        const model = new PasswordInputModel();
        model.label = contract.label;
        model.placeholder = contract.placeholder;
        model.name = contract.name;
        model.value = contract.value;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.maxLength = contract.maxLength;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: PasswordInputModel): Contract {
        const contract: PasswordInputContract = {
            type: "input:password",
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