import { IModelBinder } from "@paperbits/common/editing";
import { SearchInputModel } from "./searchInputModel";
import { Contract } from "@paperbits/common";
import { SearchInputContract } from "./searchInputContract";


export class SearchInputModelBinder implements IModelBinder<SearchInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:search";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof SearchInputModel;
    }

    public async contractToModel(contract: SearchInputContract): Promise<SearchInputModel> {
        const model = new SearchInputModel();
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

    public modelToContract(model: SearchInputModel): Contract {
        const contract: SearchInputContract = {
            type: "input:search",
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