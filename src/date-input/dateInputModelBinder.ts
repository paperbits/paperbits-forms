import { IModelBinder } from "@paperbits/common/editing";
import { DateInputModel } from "./dateInputModel";
import { Contract } from "@paperbits/common";
import { DateInputContract } from "./dateInputContract";


export class DateInputModelBinder implements IModelBinder<DateInputModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:date";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof DateInputModel;
    }

    public async contractToModel(contract: DateInputContract): Promise<DateInputModel> {
        const model = new DateInputModel();
        model.label = contract.label;
        model.name = contract.name;
        model.value = contract.value;
        model.readonly = contract.readonly;
        model.required = contract.required;
        model.styles = contract.styles || { appearance: "components/formControl/default" };

        return model;
    }

    public modelToContract(model: DateInputModel): Contract {
        const contract: DateInputContract = {
            type: "input:date",
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