import * as ko from "knockout";
import * as mapping from "knockout-mapping";
import { InputModel } from "../inputModel";
import { InputViewModel } from "./inputViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets/IViewModelBinder";

export class InputViewModelBinder implements IViewModelBinder<InputModel, InputViewModel>  {
    public modelToViewModel(model: InputModel, readonly: boolean, viewModel?: InputViewModel): InputViewModel {
        if (!viewModel) {
            viewModel = new InputViewModel(model);
        } else {
            viewModel.inputData.controlModel = model;
            viewModel.inputData.changed(new Date());
        }

        viewModel["widgetBinding"] = {
            displayName: "Input",
            model: model,
            editor: "input-editor",
            applyChanges: () => {
                this.modelToViewModel(model, readonly, viewModel);
            }
        }

        return viewModel;
    }

    public canHandleModel(model: InputModel): boolean {
        return model instanceof InputModel;
    }
}