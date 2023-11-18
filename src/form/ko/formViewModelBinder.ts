/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import "@paperbits/common/extensions";
import { FormModel } from "../formModel";
import { FormViewModel } from "./formViewModel";
import { IWidgetService, ViewModelBinder } from "@paperbits/common/widgets";
import { ViewModelBinderSelector } from "@paperbits/core/ko/viewModelBinderSelector";
import { FormHandlers } from "../formHandlers";
import { EventManager, Events } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";
import { Placeholder } from "@paperbits/core/placeholder/ko/placeholder";
import { ComponentFlow } from "@paperbits/common/components";

export class FormViewModelBinder implements ViewModelBinder<FormModel, FormViewModel> {
    constructor(
        private readonly viewModelBinderSelector: ViewModelBinderSelector,
        private readonly eventManager: EventManager,
        private readonly widgetService: IWidgetService
    ) { }

    public async modelToViewModel(model: FormModel, viewModel?: FormViewModel, bindingContext?: Bag<any>): Promise<FormViewModel> {
        if (!viewModel) {
            viewModel = new FormViewModel();
        }

        const promises = model.widgets.map(widgetModel => {
            const definition = this.widgetService.getWidgetDefinitionForModel(widgetModel);

            if (definition) {
                const bindingPromise = this.widgetService.createWidgetBinding(definition, widgetModel, bindingContext);
                return bindingPromise;
            }

            // legacy binding resolution
            const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
            const bindingPromise = widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);
            return bindingPromise;
        });

        const widgetViewModels = await Promise.all(promises);

        if (widgetViewModels.length === 0) {
            widgetViewModels.push(new Placeholder("Form"));
        }

        viewModel.widgets(widgetViewModels);
        viewModel.formAction(model.formAction);
        viewModel.formMethod(model.formMethod || "get");
        viewModel.formTarget(model.formTarget || "_self");
        viewModel.acceptCharset(model.acceptCharset);
        viewModel.encType(model.encType || "application/x-www-form-urlencoded");
        viewModel.identifier(model.identifier);
        viewModel.formName(model.formName);
        viewModel.description(model.description);
        viewModel.isInline(model.isInline);
        

        const binding = {
            name: "form",
            displayName: "Form",
            layer: bindingContext?.layer,
            model: model,
            flow: ComponentFlow.Block,
            editor: "form-editor",
            handler: FormHandlers,
            provides: ["form"],
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: FormModel): boolean {
        return model instanceof FormModel;
    }
}