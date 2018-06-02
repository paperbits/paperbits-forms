import { FormModel } from "../models";
import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract } from "@paperbits/common";
import { FormContract } from "../contracts";

export class FormModelBinder implements IModelBinder {
    constructor(private readonly modelBinderSelector: ModelBinderSelector) { }

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "form";
    }

    public canHandleModel(model): boolean {
        return model instanceof FormModel;
    }

    public async nodeToModel(node: FormContract): Promise<FormModel> {
        let model = new FormModel();
        model.formAction    = node.formAction;
        model.formMethod    = <any>node.formMethod;
        model.formTarget    = <any>node.formTarget;
        model.acceptCharset = node.acceptCharset;
        model.encType       = <any>node.encType;
        model.formName      = node.formName;
        model.isFieldset    = node.isFieldset;
        model.legendText    = node.legendText;
        model.legendAlign   = <any>node.legendAlign;
        model.description   = node.description;
        model.isInline      = node.isInline;

        if (node.nodes) {
            let modelPromises = node.nodes.map(async (node) => {
                let modelBinder: IModelBinder = this.modelBinderSelector.getModelBinderByNodeType(node.type);
                return await modelBinder.nodeToModel(node);
            });
    
            model.widgets = await Promise.all<any>(modelPromises);
        } else {
            model.widgets = [];
        }
        
        return model;
    }

    public getConfig(model: FormModel): FormContract {
        let contract: FormContract = {
            object: "block",
            type: "form",
            formAction   : model.formAction,
            formMethod   : model.formMethod,
            formTarget   : model.formTarget,
            acceptCharset: model.acceptCharset,
            encType      : model.encType,
            formName     : model.formName,
            isFieldset   : model.isFieldset,
            legendText   : model.legendText,
            legendAlign  : model.legendAlign,
            description  : model.description,
            isInline     : model.isInline,
            nodes: []
        };

        model.widgets.forEach(widgetModel => {
            let modelBinder = this.modelBinderSelector.getModelBinderByModel(widgetModel);
            contract.nodes.push(modelBinder.getConfig(widgetModel));
        });

        return contract;
    }
}