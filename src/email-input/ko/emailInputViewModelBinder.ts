import { EmailInput } from "./emailInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { EmailInputModel } from "../emailInputModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";


export class EmailInputViewModelBinder implements ViewModelBinder<EmailInputModel, EmailInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: EmailInputModel, viewModel?: EmailInput, bindingContext?: Bag<any>): Promise<EmailInput> {
        if (!viewModel) {
            viewModel = new EmailInput();
        }

        viewModel.label(model.label);
        viewModel.name(model.name);
        viewModel.value(model.value);
        viewModel.readonly(model.readonly);
        viewModel.required(model.required);
        viewModel.maxLength(model.maxLength);
        viewModel.placeholder(model.placeholder);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        viewModel["widgetBinding"] = {
            displayName: "Email input",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "block",
            editor: "email-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        return viewModel;
    }

    public canHandleModel(model: EmailInputModel): boolean {
        return model instanceof EmailInputModel;
    }
}