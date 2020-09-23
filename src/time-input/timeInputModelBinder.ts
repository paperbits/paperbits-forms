import { IModelBinder } from "@paperbits/common/editing";
import { TimeInputModel } from "./timeInputModel";
import { Contract } from "@paperbits/common";
import { TimeInputContract } from "./timeInputContract";


export class TimeInputModelBinder implements IModelBinder<TimeInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:time";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof TimeInputModel;
    }

    public async contractToModel(contract: TimeInputContract): Promise<TimeInputModel> {
        const model = new TimeInputModel();
        model.label = contract.label;
        model.name = contract.name;
        model.value = contract.value;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: TimeInputModel): Contract {
        const contract: TimeInputContract = {
            type: "input:time",
            label: model.label,
            name: model.name,
            value: model.value,
            readonly: model.readonly,
            required: model.required,
            styles: model.styles
        };

        return contract;
    }
}