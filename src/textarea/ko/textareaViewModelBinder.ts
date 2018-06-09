import { TextareaModel } from "../textareaModel";
import { TextareaViewModel } from "./textareaViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets/IViewModelBinder";

export class TextareaViewModelBinder implements IViewModelBinder<TextareaModel, TextareaViewModel>  {
    public modelToViewModel(model: TextareaModel, readonly: boolean, viewModel?: TextareaViewModel): TextareaViewModel {
        if (!viewModel) {
            viewModel = new TextareaViewModel();
        }

        viewModel.labelFor(model.textareaId);
        viewModel.labelText(model.labelText);
        viewModel.showLabel(model.showLabel);
        viewModel.textareaName(model.textareaName);
        viewModel.placeholderText(model.placeholderText);
        viewModel.textValue(model.textValue);
        viewModel.colsCount(model.colsCount);
        viewModel.rowsCount(model.rowsCount);
        viewModel.maxLength(model.maxLength);       
        viewModel.isRequired(model.isRequired);
        viewModel.isReadonly(model.isReadonly);
        viewModel.isDisabled(model.isDisabled);

        viewModel["widgetBinding"] = {
            displayName: "Textarea",
            model: model,
            editor: "textarea-editor",
            applyChanges: () => {
                this.modelToViewModel(model, readonly, viewModel);
            }
        }

        return viewModel;
    }

    public canHandleModel(model: TextareaModel): boolean {
        return model instanceof TextareaModel;
    }
}