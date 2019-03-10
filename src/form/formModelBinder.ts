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

export class FormModelBinder implements IModelBinder {
    constructor(private readonly modelBinderSelector: ModelBinderSelector) { }

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "form";
    }

    public canHandleModel(model): boolean {
        return model instanceof FormModel;
    }

    public async contractToModel(node: FormContract): Promise<FormModel> {
        const model = new FormModel();
        model.formAction    = node.formAction;
        model.formMethod    = <any>node.formMethod;
        model.formTarget    = <any>node.formTarget;
        model.acceptCharset = node.acceptCharset;
        model.encType       = <any>node.encType;
        model.formName      = node.formName;
        model.description   = node.description;
        model.isInline      = node.isInline;

        if (node.nodes) {
            const modelPromises = node.nodes.map(async (node) => {
                const modelBinder: IModelBinder = this.modelBinderSelector.getModelBinderByNodeType(node.type);
                return await modelBinder.contractToModel(node);
            });
    
            model.widgets = await Promise.all<any>(modelPromises);
        } else {
            model.widgets = [];
        }
        
        return model;
    }

    public modelToContract(model: FormModel): FormContract {
        const contract: FormContract = {
            object: "block",
            type: "form",
            formAction   : model.formAction,
            formMethod   : model.formMethod,
            formTarget   : model.formTarget,
            acceptCharset: model.acceptCharset,
            encType      : model.encType,
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