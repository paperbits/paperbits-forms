/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { IWidgetOrder, IWidgetHandler, WidgetContext } from "@paperbits/common/editing";
import { FormModel } from "./formModel";
import { ViewManager, IContextCommandSet } from "@paperbits/common/ui";
import { DragSession } from "@paperbits/common/ui/draggables";
import { WidgetModel } from "@paperbits/common/widgets";
import { SubmitModel } from "../submit/submitModel";
import { TextInputModel } from "../text-input";


export class FormHandlers implements IWidgetHandler {
    constructor(private readonly viewManager: ViewManager) { }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "form",
            displayName: "Form",
            category: "Forms",
            iconClass: "widget-icon widget-icon-form",
            requires: ["html", "js", "interaction"],
            createModel: async () => {
                const firstNameModel = new TextInputModel();
                firstNameModel.label = "First name";
                firstNameModel.name = "firstName";
                firstNameModel.placeholder = "e.g. John";
                firstNameModel.required = true;

                const lastNameModel = new TextInputModel();
                lastNameModel.label = "Last name";
                lastNameModel.name = "lastName";
                lastNameModel.placeholder = "e.g. Doe";
                lastNameModel.required = true;

                const formModel = new FormModel();
                formModel.widgets.push(firstNameModel);
                formModel.widgets.push(lastNameModel);
                formModel.widgets.push(new SubmitModel());

                return formModel;
            }
        };

        return widgetOrder;
    }

    public canAccept(dragSession: DragSession): boolean {
        return !["section"].includes(dragSession.sourceBinding.name);
    }

    public getContextCommands(context: WidgetContext): IContextCommandSet {
        const contextualEditor: IContextCommandSet = {
            color: "#4c5866",
            hoverCommands: [{
                controlType: "toolbox-button",
                color: "#607d8b",
                iconClass: "paperbits-icon paperbits-simple-add",
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

                            this.viewManager.clearContextualCommands();
                        }
                    }
                }
            }],
            deleteCommand: {
                controlType: "toolbox-button",
                tooltip: "Delete form",
                color: "#4c5866",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualCommands();
                }
            },
            selectCommands: [{
                controlType: "toolbox-button",
                displayName: "Edit form",
                position: "top right",
                callback: () => {
                    this.viewManager.openWidgetEditor(context.binding);
                }
            },
            {
                controlType: "toolbox-splitter"
            }]
        };

        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommands.push({
                controlType: "toolbox-button",
                color: "#607d8b",
                iconClass: "paperbits-icon paperbits-simple-add",
                position: "center",
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: () => context.providers,
                        onSelect: (widgetModel: WidgetModel) => {
                            context.model.widgets.push(widgetModel);
                            context.binding.applyChanges();
                            this.viewManager.clearContextualCommands();
                        }
                    }
                }
            });
        }

        return contextualEditor;
    }
}