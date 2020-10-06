import { IModelBinder } from "@paperbits/common/editing";
import { CheckboxModel } from "./checkboxModel";
import { Contract } from "@paperbits/common";
import { CheckboxContract } from "./checkboxContract";


export class CheckboxModelBinder implements IModelBinder<CheckboxModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:checkbox";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof CheckboxModel;
    }

    public async contractToModel(contract: CheckboxContract): Promise<CheckboxModel> {
        const model = new CheckboxModel();
        model.label = contract.label;
        model.name = contract.name;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: CheckboxModel): Contract {
        const contract: CheckboxContract = {
            type: "input:checkbox",
            label: model.label,
            name: model.name,
            readonly: model.readonly,
            required: model.required,
            styles: model.styles
        };

        return contract;
    }
}