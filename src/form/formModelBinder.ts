/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import { FormModel } from "./formModel";
import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { FormContract } from "./formContract";
import { Contract, Bag } from "@paperbits/common";

export class FormModelBinder implements IModelBinder<FormModel> {
    constructor(private readonly modelBinderSelector: ModelBinderSelector) { }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "form";
    }

    public canHandleModel(model): boolean {
        return model instanceof FormModel;
    }

    public async contractToModel(node: FormContract, bindingContext?: Bag<any>): Promise<FormModel> {
        const model = new FormModel();
        model.formAction    = node.formAction;
        model.formMethod    = <any>node.formMethod;
        model.formTarget    = <any>node.formTarget;
        model.acceptCharset = node.acceptCharset;
        model.encType       = <any>node.encType;
        model.identifier    = node.identifier;
        model.formName      = node.formName;
        model.description   = node.description;
        model.isInline      = node.isInline;

        if (node.nodes) {
            const modelPromises = node.nodes.map(async (contract: Contract) => {
                const modelBinder = this.modelBinderSelector.getModelBinderByContract<any>(contract);
                return await modelBinder.contractToModel(contract, bindingContext);
            });
    
            model.widgets = await Promise.all<any>(modelPromises);
        } else {
            model.widgets = [];
        }
        
        return model;
    }

    public modelToContract(model: FormModel): FormContract {
        const contract: FormContract = {
            type: "form",
            formAction   : model.formAction,
            formMethod   : model.formMethod,
            formTarget   : model.formTarget,
            acceptCharset: model.acceptCharset,
            encType      : model.encType,
            identifier   : model.identifier,
            formName     : model.formName,
            description  : model.description,
            isInline     : model.isInline,
            nodes: []
        };

        model.widgets.forEach(widgetModel => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            contract.nodes.push(modelBinder.modelToContract(widgetModel));
        });

        return contract;
    }
}