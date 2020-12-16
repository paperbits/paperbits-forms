import { IModelBinder } from "@paperbits/common/editing";
import { SelectInputModel } from "./selectInputModel";
import { Contract } from "@paperbits/common";
import { SelectContract } from "./selectContract";


export class SelectModelBinder implements IModelBinder<SelectInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:select";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof SelectInputModel;
    }

    public async contractToModel(contract: SelectContract): Promise<SelectInputModel> {
        const model = new SelectInputModel();
        model.label = contract.label;
        model.placeholder = contract.placeholder;
        model.name = contract.name;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.options = contract.options;
        model.value = contract.value;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: SelectInputModel): Contract {
        const contract: SelectContract = {
            type: "input:select",
            label: model.label,
            name: model.name,
            readonly: model.readonly,
            required: model.required,
            options: model.options,
            value: model.value,
            placeholder: model.placeholder,
            styles: model.styles
        };

        return contract;
    }
}