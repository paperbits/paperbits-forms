import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { SelectInputModel } from "../selectInputModel";
import { SelectInput } from "./selectInput";



export class SelectViewModelBinder implements ViewModelBinder<SelectInputModel, SelectInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: SelectInputModel, viewModel?: SelectInput, bindingContext?: Bag<any>): Promise<SelectInput> {
        if (!viewModel) {
            viewModel = new SelectInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);
        viewModel.options(model.options);
        viewModel.value(model.value);
        viewModel.placeholder(model.placeholder);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<SelectInputModel, SelectInput> = {
            displayName: "Select input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "select-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: SelectInputModel): boolean {
        return model instanceof SelectInputModel;
    }
}