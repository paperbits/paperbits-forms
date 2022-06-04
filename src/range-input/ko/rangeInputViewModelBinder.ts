import { RangeInput } from "./rangeInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { RangeInputModel } from "../rangeInputModel";
import { EventManager } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";


export class RangeInputViewModelBinder implements ViewModelBinder<RangeInputModel, RangeInput>  {
    constructor(private readonly eventManager: EventManager) { }

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

        const binding: IWidgetBinding<RangeInputModel, RangeInput> = {
            displayName: "Range input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "range-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUprange");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: RangeInputModel): boolean {
        return model instanceof RangeInputModel;
    }
}