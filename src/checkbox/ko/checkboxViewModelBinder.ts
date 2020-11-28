import { Checkbox } from "./checkbox";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { CheckboxModel } from "../checkboxModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";


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

        viewModel["widgetBinding"] = {
            displayName: "Checkbox",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "block",
            editor: "checkbox-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        return viewModel;
    }

    public canHandleModel(model: CheckboxModel): boolean {
        return model instanceof CheckboxModel;
    }
}