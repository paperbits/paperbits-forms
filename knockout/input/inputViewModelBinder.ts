import { InputModel } from "../../models";
import { InputViewModel } from "./inputViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets/IViewModelBinder";


export class InputViewModelBinder implements IViewModelBinder<InputModel, InputViewModel>  {
    public modelToViewModel(model: InputModel, readonly: boolean, viewModel?: InputViewModel): InputViewModel {
        if (!viewModel) {
            viewModel = new InputViewModel();
        }

        viewModel.labelFor(model.inputId);        
        viewModel.labelText(model.labelText);
        viewModel.showLabel(model.showLabel);
        viewModel.inputType(model.inputType);
        viewModel.inputName(model.inputName);
        viewModel.placeholderText(model.placeholderText);
        viewModel.inputValue(model.inputValue);

        viewModel.maxLength(model.maxLength);
        viewModel.minValue(model.minValue);
        viewModel.maxValue(model.maxValue);
        viewModel.sizeValue(model.sizeValue);
        viewModel.stepValue(model.stepValue);
        viewModel.isRequired(model.isRequired);
        viewModel.isReadonly(model.isReadonly);
        viewModel.isDisabled(model.isDisabled);
        viewModel.isChecked(model.isChecked);
        viewModel.patternRegexp(model.patternRegexp);
        viewModel.accept(model.accept);
        viewModel.isInline(model.isInline);

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