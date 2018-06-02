import { FormModel } from "../../models";
import { FormViewModel } from "./formViewModel";
import { ViewModelBinderSelector } from "@paperbits/knockout/widgets/viewModelBinderSelector";
import { IViewModelBinder } from "@paperbits/common/widgets/IViewModelBinder";
import { DragSession } from "@paperbits/common/ui/draggables/dragSession";

export class FormViewModelBinder implements IViewModelBinder<FormModel, FormViewModel> {
    private readonly viewModelBinderSelector: ViewModelBinderSelector;

    constructor(viewModelBinderSelector: ViewModelBinderSelector) {
        this.viewModelBinderSelector = viewModelBinderSelector;
    }

    public modelToViewModel(model: FormModel, readonly: boolean, formViewModel?: FormViewModel): FormViewModel {
        if (!formViewModel) {
            formViewModel = new FormViewModel();
        }

        let widgetViewModels = model.widgets
            .map(widgetModel => {
                let widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);

                if (!widgetViewModelBinder) {
                    return null;
                }

                const widgetViewModel = widgetViewModelBinder.modelToViewModel(widgetModel, readonly);

                return widgetViewModel;
            })
            .filter(x => x != null);

        formViewModel.widgets(widgetViewModels);
        formViewModel.formAction(model.formAction);
        formViewModel.formMethod(model.formMethod || "get");
        formViewModel.formTarget(model.formTarget || "_self");
        formViewModel.acceptCharset(model.acceptCharset);
        formViewModel.encType(model.encType || "application/x-www-form-urlencoded");
        formViewModel.formName(model.formName);
        formViewModel.isFieldset(model.isFieldset);
        formViewModel.legendText(model.legendText);
        formViewModel.legendAlign(model.legendAlign || "left");
        formViewModel.description(model.description);
        formViewModel.isInline(model.isInline);

        const binding = {
            displayName: "Form",
            readonly: readonly,
            model: model,
            editor: "form-editor",
            applyChanges: () => {
                this.modelToViewModel(model, readonly, formViewModel);
            },
            onDragOver: (dragSession: DragSession): boolean => {
                const canAccept = !readonly && dragSession.type === "widget";
                return canAccept;
            },
            onDragDrop: (dragSession: DragSession): void => {
                if (dragSession.type == "widget") {
                    model.widgets.splice(dragSession.insertIndex, 0, dragSession.sourceModel);
                }
                binding.applyChanges();
            }
        }

        formViewModel["widgetBinding"] = binding;

        return formViewModel;
    }

    public canHandleModel(model: FormModel): boolean {
        return model instanceof FormModel;
    }
}