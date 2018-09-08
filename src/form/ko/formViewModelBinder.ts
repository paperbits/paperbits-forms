import "@paperbits/common/extensions";
import { FormModel } from "../formModel";
import { FormViewModel } from "./formViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { DragSession } from "@paperbits/common/ui/draggables";
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

        const widgetViewModels = model.widgets
            .map(widgetModel => {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);

                if (!widgetViewModelBinder) {
                    return null;
                }

                const widgetViewModel = widgetViewModelBinder.modelToViewModel(widgetModel, readonly);

                return widgetViewModel;
            })
            .filter(x => x !== null);

        formViewModel.widgets(widgetViewModels);
        formViewModel.formAction(model.formAction);
        formViewModel.formMethod(model.formMethod || "get");
        formViewModel.formTarget(model.formTarget || "_self");
        formViewModel.acceptCharset(model.acceptCharset);
        formViewModel.encType(model.encType || "application/x-www-form-urlencoded");
        formViewModel.formName(model.formName);
        formViewModel.description(model.description);
        formViewModel.isInline(model.isInline);

        const binding = {
            name: "form",
            displayName: "Form",
            readonly: readonly,
            model: model,
            editor: "form-editor",
            provides: ["form"],
            applyChanges: () => {
                this.modelToViewModel(model, readonly, formViewModel);
            },
            onDragOver: (dragSession: DragSession): boolean => {
                const canAccept = !readonly && dragSession.type === "widget";
                return canAccept;
            },
            onDragDrop: (dragSession: DragSession): void => {
                if (dragSession.type === "widget") {
                    model.widgets.splice(dragSession.insertIndex, 0, dragSession.sourceModel);
                }
                binding.applyChanges();
            },

            getContextualEditor: (element: HTMLElement): IContextualEditor => {
                const contextualEditor: IContextualEditor = {
                    element: element,
                    color: "#4c5866",
                    hoverCommand: null,
                    deleteCommand: {
                        tooltip: "Delete form",
                        color: "#4c5866",
                        callback: () => {
                            const widgetModel = GridHelper.getModel(element);
                            const parentBinding = GridHelper.getParentWidgetBinding(element);
                            parentBinding.model.widgets.remove(widgetModel);
                            parentBinding.applyChanges();
                            this.viewManager.clearContextualEditors();
                        }
                    },
                    selectionCommands: [{
                        tooltip: "Edit form",
                        iconClass: "paperbits-edit-72",
                        position: "top right",
                        color: "#4c5866",
                        callback: () => {
                            const binding = GridHelper.getWidgetBinding(element);
                            this.viewManager.openWidgetEditor(binding);
                        }
                    }]
                };

                const attachedModel = <FormModel>GridHelper.getModel(element);

                if (attachedModel.widgets.length === 0) {
                    contextualEditor.hoverCommand = {
                        color: "#607d8b",
                        position: "center",
                        tooltip: "Add widget",
                        component: {
                            name: "widget-selector",
                            params: {
                                onRequest: () => {
                                    const parentElement = GridHelper.getParentElementWithModel(element);
                                    const bindings = GridHelper.getParentWidgetBindings(parentElement);
                                    const provided = bindings
                                        .filter(x => x.provides !== null)
                                        .map(x => x.provides)
                                        .reduce((acc, val) => acc.concat(val));

                                    return provided;
                                },
                                onSelect: (widgetModel: any) => {
                                    const formModel = <FormModel>GridHelper.getModel(element);
                                    const formWidgetBinding = GridHelper.getWidgetBinding(element);

                                    formModel.widgets.push(widgetModel);
                                    formWidgetBinding.applyChanges();

                                    this.viewManager.clearContextualEditors();
                                }
                            }
                        }
                    };
                }

                return contextualEditor;
            }
        };

        formViewModel["widgetBinding"] = binding;

        return formViewModel;
    }

    public canHandleModel(model: FormModel): boolean {
        return model instanceof FormModel;
    }
}