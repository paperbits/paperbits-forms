/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import "@paperbits/common/extensions";
import { FormModel } from "../formModel";
import { FormViewModel } from "./formViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { ViewModelBinderSelector } from "@paperbits/core/ko/viewModelBinderSelector";
import { FormHandlers } from "../formHandlers";
import { EventManager, Events } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";
import { ComponentFlow } from "@paperbits/common/editing";
import { PlaceholderViewModel } from "@paperbits/core/placeholder/ko/placeholderViewModel";

export class FormViewModelBinder implements ViewModelBinder<FormModel, FormViewModel> {
    constructor(
        private readonly viewModelBinderSelector: ViewModelBinderSelector,
        private readonly eventManager: EventManager
    ) { }

    public async modelToViewModel(model: FormModel, viewModel?: FormViewModel, bindingContext?: Bag<any>): Promise<FormViewModel> {
        if (!viewModel) {
            viewModel = new FormViewModel();
        }

        const viewModels = [];

        for (const widgetModel of model.widgets) {
            const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
            const widgetViewModel = await widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);

            viewModels.push(widgetViewModel);
        }

        if (viewModels.length === 0) {
            viewModels.push(new PlaceholderViewModel("Form"));
        }

        viewModel.widgets(viewModels);
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