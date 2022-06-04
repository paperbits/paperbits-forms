import { Checkbox } from "./checkbox";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { CheckboxModel } from "../checkboxModel";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";


export class CheckboxViewModelBinder implements ViewModelBinder<CheckboxModel, Checkbox>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: CheckboxModel, viewModel?: Checkbox, bindingContext?: Bag<any>): Promise<Checkbox> {
        if (!viewModel) {
            viewModel = new Checkbox();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<CheckboxModel, Checkbox> = {
            displayName: "Checkbox",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "checkbox-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: CheckboxModel): boolean {
        return model instanceof CheckboxModel;
    }
}