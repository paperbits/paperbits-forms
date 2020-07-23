import { Submit } from "./submit";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { SubmitModel } from "../submitModel";
import { EventManager } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { Bag } from "@paperbits/common";


export class SubmitViewModelBinder implements ViewModelBinder<SubmitModel, Submit>  {
    constructor(
        private readonly eventManager: EventManager,
        private readonly styleCompiler: StyleCompiler
    ) { }

    public async modelToViewModel(model: SubmitModel, viewModel?: Submit, bindingContext?: Bag<any>): Promise<Submit> {
        if (!viewModel) {
            viewModel = new Submit();
        }

        viewModel.label(model.label);

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        viewModel["widgetBinding"] = {
            displayName: "Submit",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            flow: "inline",
            editor: "submit-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        return viewModel;
    }

    public canHandleModel(model: SubmitModel): boolean {
        return model instanceof SubmitModel;
    }
}