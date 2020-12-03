import { RangeInput } from "./rangeInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { RangeInputModel } from "../rangeInputModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";


export class RangeInputViewModelBinder implements ViewModelBinder<RangeInputModel, RangeInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: RangeInputModel, viewModel?: RangeInput, bindingContext?: Bag<any>): Promise<RangeInput> {
        if (!viewModel) {
            viewModel = new RangeInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.minValue(model.minValue);
        viewModel.maxValue(model.maxValue);
        viewModel.value(model.value);
        viewModel.readonly(model.readonly);

        viewModel["widgetBinding"] = {
            displayName: "Range input",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "block",
            editor: "range-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUprange");
            }
        };

        return viewModel;
    }

    public canHandleModel(model: RangeInputModel): boolean {
        return model instanceof RangeInputModel;
    }
}