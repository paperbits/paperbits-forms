import { MultilineInput } from "./multilineInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { MultilineInputModel } from "../multilineInputModel";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { ComponentFlow } from "@paperbits/common/components";


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

        const binding: IWidgetBinding<MultilineInputModel, MultilineInput> = {
            displayName: "Multi-line input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "multiline-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: MultilineInputModel): boolean {
        return model instanceof MultilineInputModel;
    }
}