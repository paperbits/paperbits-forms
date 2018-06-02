import { TextareaModel } from "../models";
import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract } from "@paperbits/common";
import { TextareaContract } from "../contracts";

export class TextareaModelBinder implements IModelBinder {
    constructor(private readonly modelBinderSelector: ModelBinderSelector) { }

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "textarea";
    }

    public canHandleModel(model): boolean {
        return model instanceof TextareaModel;
    }

    public async nodeToModel(node: TextareaContract): Promise<TextareaModel> {
        let model = new TextareaModel();
        model.textareaId      = node.textareaId     ;
        model.showLabel       = <any>node.showLabel ;
        model.labelText       = node.labelText      ;
        model.textareaName    = node.textareaName   ;
        model.placeholderText = node.placeholderText;
        model.textValue       = node.textValue      ;
        model.colsCount       = node.colsCount      ;
        model.rowsCount       = node.rowsCount      ;
        model.maxLength       = node.maxLength      ;
        model.isRequired      = node.isRequired     ;
        model.isReadonly      = node.isReadonly     ;
        model.isDisabled      = node.isDisabled     ;

        return model;
    }

    public getConfig(model: TextareaModel): TextareaContract {
        let contract: TextareaContract = {
            object: "block",
            type: "textarea",
            textareaId:      model.textareaId,
            showLabel :      model.showLabel,
            labelText :      model.labelText,
            textareaName   : model.textareaName,
            placeholderText: model.placeholderText,
            textValue :      model.textValue,
            colsCount :      model.colsCount,
            rowsCount :      model.rowsCount,
            maxLength:       model.maxLength,
            isRequired:      model.isRequired,
            isReadonly:      model.isReadonly,
            isDisabled:      model.isDisabled
        };

        return contract;
    }
}