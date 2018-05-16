import { SelectModel } from "../../models";
import { SelectViewModel } from "./selectViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets/IViewModelBinder";

export class SelectViewModelBinder implements IViewModelBinder<SelectModel, SelectViewModel>  {
    public modelToViewModel(model: SelectModel, readonly: boolean, viewModel?: SelectViewModel): SelectViewModel {
        if (!viewModel) {
            viewModel = new SelectViewModel();
        }

        viewModel.labelFor(model.selectId);
        viewModel.showLabel(model.showLabel);
        viewModel.labelText(model.labelText);
        viewModel.selectName(model.selectName);
        viewModel.isRequired(model.isRequired);
        viewModel.isDisabled(model.isDisabled);
        viewModel.textValue(model.textValue);
        viewModel.sizeCount(model.sizeCount);
        viewModel.isMultiple(model.isMultiple);       
        viewModel.optionsList(model.optionsList || []);
        viewModel.defaultText(model.defaultText || "Please choose an option");

        viewModel["widgetBinding"] = {
            displayName: "Select",
            model: model,
            editor: "select-editor",
            applyChanges: () => {
                this.modelToViewModel(model, readonly, viewModel);
            }
        }

        return viewModel;
    }

    public canHandleModel(model: SelectModel): boolean {
        return model instanceof SelectModel;
    }
}