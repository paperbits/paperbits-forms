import { PasswordInput } from "./passwordInput";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { PasswordInputModel } from "../passwordInputModel";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";
import { IWidgetBinding } from "@paperbits/common/editing";
import { ComponentFlow } from "@paperbits/common/components";


export class PasswordInputViewModelBinder implements ViewModelBinder<PasswordInputModel, PasswordInput>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: PasswordInputModel, viewModel?: PasswordInput, bindingContext?: Bag<any>): Promise<PasswordInput> {
        if (!viewModel) {
            viewModel = new PasswordInput();
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

        const binding: IWidgetBinding<PasswordInputModel, PasswordInput> = {
            displayName: "Password input",
            layer: bindingContext?.layer,
            model: model,
            draggable: true,
            flow: ComponentFlow.Block,
            editor: "password-input-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        viewModel["widgetBinding"] = binding;

        return viewModel;
    }

    public canHandleModel(model: PasswordInputModel): boolean {
        return model instanceof PasswordInputModel;
    }
}