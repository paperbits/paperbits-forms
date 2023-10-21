import { TextInput } from "./textInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { TextInputModel } from "../textInputModel";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";


export class TextInputViewModelBinder implements ViewModelBinder<TextInputModel, TextInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: TextInputModel, viewModel?: TextInput, bindingContext?: Bag<any>): Promise<TextInput> {
        if (!viewModel) {
            viewModel = new TextInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.value(model.value);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);
        viewModel.maxLength(model.maxLength);
        viewModel.placeholder(model.placeholder);
        viewModel.invalidFeedback(model.invalidFeedback);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<TextInputModel, TextInput> = {
            displayName: "Text input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "text-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: TextInputModel): boolean {
        return model instanceof TextInputModel;
    }
}