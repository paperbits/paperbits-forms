/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IWidgetOrder, IWidgetHandler, WidgetContext } from "@paperbits/common/editing";
import { FormModel } from "./formModel";
import { TextInputModel, SubmitInputModel } from "../input";
import { ViewManager, IContextCommandSet } from "@paperbits/common/ui";
import { DragSession } from "@paperbits/common/ui/draggables";
import { WidgetModel } from "@paperbits/common/widgets";


export class FormHandlers implements IWidgetHandler {
    constructor(private readonly viewManager: ViewManager) { }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "form",
            displayName: "Form",
            category: "Forms",
            iconClass: "paperbits-form",
            requires: ["html", "js", "interaction"],
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

    public canAccept(dragSession: DragSession): boolean {
        return !["section", "row", "column", "form"].includes(dragSession.sourceBinding.name);
    }

    public getContextualEditor(context: WidgetContext): IContextCommandSet {
        const contextualEditor: IContextCommandSet = {
            color: "#4c5866",
            hoverCommands: [{
                color: "#607d8b",
                position: context.half,
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: () => context.providers,
                        onSelect: (newWidgetModel: any) => {
                            let index = context.parentModel.widgets.indexOf(context.model);

                            if (context.half === "bottom") {
                                index++;
                            }

                            context.parentBinding.model.widgets.splice(index, 0, newWidgetModel);
                            context.parentBinding.applyChanges();

                            this.viewManager.clearContextualEditors();
                        }
                    }
                }
            }],
            deleteCommand: {
                tooltip: "Delete form",
                color: "#4c5866",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                }
            },
            selectCommands: [{
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
            contextualEditor.hoverCommands.push({
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
            });
        }

        return contextualEditor;
    }
}