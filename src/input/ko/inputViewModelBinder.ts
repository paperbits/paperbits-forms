import { InputModel } from "../inputModel";
import { InputViewModel } from "./inputViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets";

export class InputViewModelBinder implements IViewModelBinder<InputModel, InputViewModel>  {
    public modelToViewModel(model: InputModel, readonly: boolean, viewModel?: InputViewModel): InputViewModel {
        if (!viewModel) {
            viewModel = new InputViewModel(model);
        } else {
            viewModel.inputData.controlModel = model;
            viewModel.inputData.changed(new Date());
        }

        const binding = {
            displayName: "Input",
            model: model,
            editor: "input-editor",
            applyChanges: () => {
                this.modelToViewModel(model, readonly, viewModel);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: InputModel): boolean {
        return model instanceof InputModel;
    }
}