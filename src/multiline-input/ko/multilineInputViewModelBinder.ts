import { MultilineInput } from "./multilineInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { MultilineInputModel } from "../multilineInputModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";


export class MultilineInputViewModelBinder implements ViewModelBinder<MultilineInputModel, MultilineInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: MultilineInputModel, viewModel?: MultilineInput, bindingContext?: Bag<any>): Promise<MultilineInput> {
        if (!viewModel) {
            viewModel = new MultilineInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);
        viewModel.maxLength(model.maxLength);
        viewModel.placeholder(model.placeholder);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        viewModel["widgetBinding"] = {
            displayName: "Multi-line input",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "block",
            editor: "multiline-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        return viewModel;
    }

    public canHandleModel(model: MultilineInputModel): boolean {
        return model instanceof MultilineInputModel;
    }
}