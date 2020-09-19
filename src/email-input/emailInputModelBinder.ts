import { IModelBinder } from "@paperbits/common/editing";
import { EmailInputModel } from "./emailInputModel";
import { Contract } from "@paperbits/common";
import { EmailInputContract } from "./emailInputContract";


export class EmailInputModelBinder implements IModelBinder<EmailInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:email";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof EmailInputModel;
    }

    public async contractToModel(contract: EmailInputContract): Promise<EmailInputModel> {
        const model = new EmailInputModel();
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

    public modelToContract(model: EmailInputModel): Contract {
        const contract: EmailInputContract = {
            type: "input:email",
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