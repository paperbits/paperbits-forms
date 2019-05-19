/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { InputModel } from "../inputModel";
import { InputViewModel } from "./inputViewModel";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { IEventManager } from "@paperbits/common/events";

interface InputModelRegistration {
    displayName: string;
    inputClass: new () => InputModel;
}

export class GenericInputViewModelBinder implements ViewModelBinder<InputModel, InputViewModel>  {
    private inputs: InputModelRegistration[];

    constructor(private readonly eventManager: IEventManager) {
        this.inputs = [];
    }

    public registerInput(displayName: string, inputModelClass: new () => InputModel): void {
        this.inputs.push({ displayName: displayName, inputClass: inputModelClass });
    }

    public async modelToViewModel(model: InputModel, viewModel?: InputViewModel): Promise<InputViewModel> {
        if (!viewModel) {
            viewModel = new InputViewModel(model);
        }
        else {
            viewModel.inputData(model);
        }

        const registration = this.inputs.find(x => model instanceof x.inputClass);

        const binding = {
            displayName: registration.displayName,
            model: model,
            editor: "input-editor",
            applyChanges: () => {
                this.modelToViewModel(model, viewModel);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: InputModel): boolean {
        return this.inputs.some(x => model instanceof x.inputClass);
    }
}