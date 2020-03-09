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
import { EventManager } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";

export class FormViewModelBinder implements ViewModelBinder<FormModel, FormViewModel> {
    constructor(
        private readonly viewModelBinderSelector: ViewModelBinderSelector,
        private readonly eventManager: EventManager
    ) { }

    public async modelToViewModel(model: FormModel, formViewModel?: FormViewModel, bindingContext?: Bag<any>): Promise<FormViewModel> {
        if (!formViewModel) {
            formViewModel = new FormViewModel();
        }

        const viewModels = [];

        for (const widgetModel of model.widgets) {
            const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);
            const widgetViewModel = await widgetViewModelBinder.modelToViewModel(widgetModel, null, bindingContext);

            viewModels.push(widgetViewModel);
        }

        formViewModel.widgets(viewModels);
        formViewModel.formAction(model.formAction);
        formViewModel.formMethod(model.formMethod || "get");
        formViewModel.formTarget(model.formTarget || "_self");
        formViewModel.acceptCharset(model.acceptCharset);
        formViewModel.encType(model.encType || "application/x-www-form-urlencoded");
        formViewModel.identifier(model.identifier);
        formViewModel.formName(model.formName);
        formViewModel.description(model.description);
        formViewModel.isInline(model.isInline);

        const binding = {
            name: "form",
            displayName: "Form",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            editor: "form-editor",
            handler: FormHandlers,
            provides: ["form"],
            applyChanges: async () => {
                await this.modelToViewModel(model, formViewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        formViewModel["widgetBinding"] = binding;

        return formViewModel;
    }

    public canHandleModel(model: FormModel): boolean {
        return model instanceof FormModel;
    }
}