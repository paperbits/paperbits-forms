import { IModelBinder } from "@paperbits/common/editing";
import { UrlInputModel } from "./urlInputModel";
import { Contract } from "@paperbits/common";
import { UrlInputContract } from "./urlInputContract";


export class UrlInputModelBinder implements IModelBinder<UrlInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:url";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof UrlInputModel;
    }

    public async contractToModel(contract: UrlInputContract): Promise<UrlInputModel> {
        const model = new UrlInputModel();
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

    public modelToContract(model: UrlInputModel): Contract {
        const contract: UrlInputContract = {
            type: "input:url",
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