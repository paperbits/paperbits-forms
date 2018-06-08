import { IModelBinder } from "@paperbits/common/editing";
import { ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract } from "@paperbits/common";
import { InputModel, InputContract } from ".";

export class InputModelBinder implements IModelBinder {
    constructor(private readonly modelBinderSelector: ModelBinderSelector) { }

    public canHandleWidgetType(widgetType: string): boolean {
        return widgetType === "input";
    }

    public canHandleModel(model): boolean {
        return model instanceof InputModel;
    }

    public async nodeToModel(node: InputContract): Promise<InputModel> {
        let model = new InputModel();
        model.inputId         = node.inputId ;
        model.showLabel       = <any>node.showLabel;
        model.labelText       = node.labelText;
        model.inputType       = <any>node.inputType;
        model.inputName       = node.inputName;
        model.inputValue      = node.inputValue;
        model.maxLength       = node.maxLength;
        model.minValue        = node.minValue;
        model.maxValue        = node.maxValue;
        model.sizeValue       = node.sizeValue;
        model.stepValue       = node.stepValue;
        model.isRequired      = node.isRequired;
        model.isReadonly      = node.isReadonly;
        model.isDisabled      = node.isDisabled;
        model.isChecked       = node.isChecked;
        model.patternRegexp   = node.patternRegexp;
        model.placeholderText = node.placeholderText;
        model.isInline        = node.isInline;
        
        return model;
    }

    public getConfig(model: InputModel): InputContract {
        let contract: InputContract = {
            object: "block",
            type: "input",
            inputId   : model.inputId, 
            showLabel : model.showLabel,
            labelText : model.labelText,
            inputType : model.inputType,
            inputName : model.inputName,
            inputValue: model.inputValue,
            maxLength : model.maxLength,
            minValue  : model.minValue,
            maxValue  : model.maxValue,
            sizeValue : model.sizeValue,
            stepValue : model.stepValue,
            isRequired: model.isRequired,
            isReadonly: model.isReadonly,
            isDisabled: model.isDisabled,
            isChecked : model.isChecked,
            patternRegexp  : model.patternRegexp,
            placeholderText: model.placeholderText,
            isInline  : model.isInline
        };

        return contract;
    }
}