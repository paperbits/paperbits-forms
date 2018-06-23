import { FormModel } from "../formModel";
import { FormViewModel } from "./formViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets/IViewModelBinder";
import { DragSession } from "@paperbits/common/ui/draggables/dragSession";
import { GridHelper } from "@paperbits/common/editing";
import { IContextualEditor, IViewManager } from "@paperbits/common/ui";
import { ViewModelBinderSelector } from "@paperbits/core/ko/viewModelBinderSelector";

export class FormViewModelBinder implements IViewModelBinder<FormModel, FormViewModel> {
    constructor(
        private readonly viewModelBinderSelector: ViewModelBinderSelector,
        private readonly viewManager: IViewManager
    ) {
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
            name: "form",
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
            },

            getFormContextualEditor: (activeElement: HTMLElement): IContextualEditor => {
                let contextualEditor: IContextualEditor = {
                    element: activeElement,
                    color: "#4c5866",
                    hoverCommand: null,
                    deleteCommand: {
                        tooltip: "Delete form",
                        color: "#4c5866",
                        callback: () => {
                            const rowElement = GridHelper.getParentElementWithModel(activeElement);
                            const rowModel = GridHelper.getModel(rowElement);
                            const rowBinding = GridHelper.getWidgetBinding(rowElement);
                            const formModel = GridHelper.getModel(activeElement);

                            rowModel.widgets.remove(formModel);
                            rowBinding.applyChanges();

                            this.viewManager.clearContextualEditors();
                        }
                    },
                    selectionCommands: [{
                        tooltip: "Edit form",
                        iconClass: "paperbits-edit-72",
                        position: "top right",
                        color: "#4c5866",
                        callback: () => {
                            const binding = GridHelper.getWidgetBinding(activeElement);
                            this.viewManager.openWidgetEditor(binding);
                        }
                    }]
                }

                let attachedModel = <FormModel>GridHelper.getModel(activeElement);

                if (attachedModel.widgets.length === 0) {
                    contextualEditor.hoverCommand = {
                        color: "#607d8b",
                        position: "center",
                        tooltip: "Add widget",
                        component: {
                            name: "widget-selector",
                            params: {
                                onSelect: (widgetModel: any) => {
                                    const formModel = <FormModel>GridHelper.getModel(activeElement);
                                    const formWidgetBinding = GridHelper.getWidgetBinding(activeElement);

                                    formModel.widgets.push(widgetModel);
                                    formWidgetBinding.applyChanges();

                                    this.viewManager.clearContextualEditors();
                                }
                            }
                        }
                    }
                }

                return contextualEditor;
            }
        }

        formViewModel["widgetBinding"] = binding;

        return formViewModel;
    }

    public canHandleModel(model: FormModel): boolean {
        return model instanceof FormModel;
    }
}