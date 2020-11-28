import { NumberInput } from "./numberInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { NumberInputModel } from "../numberInputModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";


export class NumberInputViewModelBinder implements ViewModelBinder<NumberInputModel, NumberInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: NumberInputModel, viewModel?: NumberInput, bindingContext?: Bag<any>): Promise<NumberInput> {
        if (!viewModel) {
            viewModel = new NumberInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.value(model.value);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);
        viewModel.min(model.min);
        viewModel.max(model.max);
        viewModel.placeholder(model.placeholder);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        viewModel["widgetBinding"] = {
            displayName: "Number input",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "block",
            editor: "number-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        return viewModel;
    }

    public canHandleModel(model: NumberInputModel): boolean {
        return model instanceof NumberInputModel;
    }
}