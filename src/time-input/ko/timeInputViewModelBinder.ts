import { TimeInput } from "./timeInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { TimeInputModel } from "../timeInputModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";


export class TimeInputViewModelBinder implements ViewModelBinder<TimeInputModel, TimeInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: TimeInputModel, viewModel?: TimeInput, bindingContext?: Bag<any>): Promise<TimeInput> {
        if (!viewModel) {
            viewModel = new TimeInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.value(model.value);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<TimeInputModel, TimeInput> = {
            displayName: "Time input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "time-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUptime");
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: TimeInputModel): boolean {
        return model instanceof TimeInputModel;
    }
}