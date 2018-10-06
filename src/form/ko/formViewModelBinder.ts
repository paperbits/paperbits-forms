/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license.
 */

import "@paperbits/common/extensions";
import { FormModel } from "../formModel";
import { FormViewModel } from "./formViewModel";
import { IViewModelBinder } from "@paperbits/common/widgets";
import { ViewModelBinderSelector } from "@paperbits/core/ko/viewModelBinderSelector";
import { FormHandlers } from "../formHandlers";

export class FormViewModelBinder implements IViewModelBinder<FormModel, FormViewModel> {
    constructor(
        private readonly viewModelBinderSelector: ViewModelBinderSelector) {
    }

    public modelToViewModel(model: FormModel, formViewModel?: FormViewModel): FormViewModel {
        if (!formViewModel) {
            formViewModel = new FormViewModel();
        }

        const widgetViewModels = model.widgets
            .map(widgetModel => {
                const widgetViewModelBinder = this.viewModelBinderSelector.getViewModelBinderByModel(widgetModel);

                if (!widgetViewModelBinder) {
                    return null;
                }

                const widgetViewModel = widgetViewModelBinder.modelToViewModel(widgetModel);

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
            model: model,
            editor: "form-editor",
            handler: FormHandlers,
            provides: ["form"],
            applyChanges: () => {
                this.modelToViewModel(model, formViewModel);
            }
        };

        formViewModel["widgetBinding"] = binding;

        return formViewModel;
    }

    public canHandleModel(model: FormModel): boolean {
        return model instanceof FormModel;
    }
}