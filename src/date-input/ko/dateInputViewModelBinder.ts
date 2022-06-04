import { DateInput } from "./dateInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { DateInputModel } from "../dateInputModel";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";


export class DateInputViewModelBinder implements ViewModelBinder<DateInputModel, DateInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: DateInputModel, viewModel?: DateInput, bindingContext?: Bag<any>): Promise<DateInput> {
        if (!viewModel) {
            viewModel = new DateInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.value(model.value);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        const binding: IWidgetBinding<DateInputModel, DateInput> = {
            displayName: "Date input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "date-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: DateInputModel): boolean {
        return model instanceof DateInputModel;
    }
}