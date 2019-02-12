/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license.
 */

import { IWidgetOrder, IWidgetHandler, WidgetContext } from "@paperbits/common/editing";
import { FormModel } from "./formModel";
import { TextInputModel, SubmitInputModel } from "../input";
import { IViewManager, IContextCommandSet } from "@paperbits/common/ui";
import { DragSession } from "@paperbits/common/ui/draggables";
import { WidgetModel } from "@paperbits/common/widgets";


export class FormHandlers implements IWidgetHandler {
    constructor(private readonly viewManager: IViewManager) { }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "form",
            displayName: "Form",
            iconClass: "paperbits-form",
            requires: ["keyboard"],
            createModel: async () => {
                const firstNameModel = new TextInputModel();
                firstNameModel.setProperty("labelText", "First name");
                firstNameModel.setProperty("inputName", "firstName");
                firstNameModel.setProperty("placeholderText", "e.g. John");
                firstNameModel.setProperty("isRequired", true);

                const lastNameModel = new TextInputModel();
                lastNameModel.setProperty("labelText", "Last name");
                lastNameModel.setProperty("inputName", "lastName");
                lastNameModel.setProperty("placeholderText", "e.g. Doe");
                lastNameModel.setProperty("isRequired", true);

                const submitModel = new SubmitInputModel();
                submitModel.setProperty("inputValue", "Register");
                submitModel.setProperty("labelText", "Register");

                const formModel = new FormModel();
                formModel.widgets.push(firstNameModel);
                formModel.widgets.push(lastNameModel);
                formModel.widgets.push(submitModel);

                return formModel;
            }
        };

        return widgetOrder;
    }

    public onDragOver(dragSession: DragSession): boolean {
        return dragSession.type === "widget";
    }

    public onDragDrop(dragSession: DragSession): void {
        if (dragSession.type === "widget") {
            dragSession.targetBinding.model.widgets.splice(dragSession.insertIndex, 0, dragSession.sourceModel);
            dragSession.targetBinding.applyChanges();
        }
    }

    public getContextualEditor(context: WidgetContext): IContextCommandSet {
        const contextualEditor: IContextCommandSet = {
            color: "#4c5866",
            hoverCommand: null,
            deleteCommand: {
                tooltip: "Delete form",
                color: "#4c5866",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                }
            },
            selectionCommands: [{
                tooltip: "Edit form",
                iconClass: "paperbits-edit-72",
                position: "top right",
                color: "#4c5866",
                callback: () => {
                    this.viewManager.openWidgetEditor(context.binding);
                }
            }]
        };

        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommand = {
                color: "#607d8b",
                position: "center",
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: () => context.providers,
                        onSelect: (widgetModel: WidgetModel) => {
                            context.model.widgets.push(widgetModel);
                            context.binding.applyChanges();
                            this.viewManager.clearContextualEditors();
                        }
                    }
                }
            };
        }

        return contextualEditor;
    }
}