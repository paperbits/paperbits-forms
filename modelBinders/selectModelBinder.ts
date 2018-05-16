import { SelectModel } from "../models";
import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract } from "@paperbits/common";
import { SelectContract } from "../contracts";

export class SelectModelBinder implements IModelBinder {
    constructor(private readonly modelBinderSelector: ModelBinderSelector) { }

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "input";
    }

    public canHandleModel(model): boolean {
        return model instanceof SelectModel;
    }

    public async nodeToModel(node: SelectContract): Promise<SelectModel> {
        let model = new SelectModel();
        model.selectId    = node.selectId;
        model.showLabel   = <any>node.showLabel;
        model.labelText   = node.labelText;
        model.selectName  = node.selectName;
        model.textValue   = node.textValue;
        model.sizeCount   = node.sizeCount;
        model.isMultiple  = node.isMultiple;
        model.isRequired  = node.isRequired;
        model.isDisabled  = node.isDisabled;
        model.optionsList = node.optionsList;
        model.defaultText = node.defaultText;

        return model;
    }

    public getConfig(model: SelectModel): SelectContract {
        let contract: SelectContract = {
            object: "block",
            type: "select",
            selectId  :  model.selectId,
            showLabel :  model.showLabel,
            labelText :  model.labelText,
            selectName:  model.selectName,
            textValue :  model.textValue,
            sizeCount :  model.sizeCount,
            isMultiple:  model.isMultiple,
            isRequired:  model.isRequired,
            isDisabled:  model.isDisabled,
            optionsList: model.optionsList,
            defaultText: model.defaultText
        };

        return contract;
    }
}