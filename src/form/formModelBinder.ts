/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { FormModel } from "./formModel";
import { CollectionModelBinder, IModelBinder } from "@paperbits/common/editing";
import { IWidgetService, ModelBinderSelector } from "@paperbits/common/widgets";
import { FormContract } from "./formContract";
import { Contract, Bag } from "@paperbits/common";

export class FormModelBinder extends CollectionModelBinder implements IModelBinder<FormModel> {
    constructor(
        protected readonly widgetService: IWidgetService,
        protected modelBinderSelector: ModelBinderSelector
    ) {
        super(widgetService, modelBinderSelector);
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "form";
    }

    public canHandleModel(model): boolean {
        return model instanceof FormModel;
    }

    public async contractToModel(contract: FormContract, bindingContext?: Bag<any>): Promise<FormModel> {
        const model = new FormModel();
        model.formAction = contract.formAction;
        model.formMethod = <any>contract.formMethod;
        model.formTarget = <any>contract.formTarget;
        model.acceptCharset = contract.acceptCharset;
        model.encType = <any>contract.encType;
        model.identifier = contract.identifier;
        model.formName = contract.formName;
        model.description = contract.description;
        model.isInline = contract.isInline;
        model.widgets = await this.getChildModels(contract.nodes, bindingContext);

        return model;
    }

    public modelToContract(model: FormModel): FormContract {
        const contract: FormContract = {
            type: "form",
            formAction: model.formAction,
            formMethod: model.formMethod,
            formTarget: model.formTarget,
            acceptCharset: model.acceptCharset,
            encType: model.encType,
            identifier: model.identifier,
            formName: model.formName,
            description: model.description,
            isInline: model.isInline,
            nodes: this.getChildContracts(model.widgets),
        };

        return contract;
    }
}