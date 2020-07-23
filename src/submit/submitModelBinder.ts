import { IModelBinder } from "@paperbits/common/editing";
import { SubmitModel } from "./submitModel";
import { Contract } from "@paperbits/common";
import { SubmitContract } from "./submitContract";


export class SubmitModelBinder implements IModelBinder<SubmitModel>  {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === "input:submit";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof SubmitModel;
    }

    public async contractToModel(contract: SubmitContract): Promise<SubmitModel> {
        const model = new SubmitModel();
        model.label = contract.label;
        model.styles = contract.styles || { appearance: "components/button/default" };

        return model;
    }

    public modelToContract(model: SubmitModel): Contract {
        const contract: SubmitContract = {
            type: "input:submit",
            label: model.label,
            styles: model.styles
        };

        return contract;
    }
}