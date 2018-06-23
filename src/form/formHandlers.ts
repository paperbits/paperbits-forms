import { IWidgetOrder } from '@paperbits/common/editing';
import { IWidgetHandler } from '@paperbits/common/editing';
import { IViewManager } from "@paperbits/common/ui/IViewManager";
import { FormModelBinder } from "./formModelBinder";
import { FormContract } from "./formContract";

export class FormHandlers implements IWidgetHandler {
    private readonly formModelBinder: FormModelBinder;

    constructor(formModelBinder: FormModelBinder) {
        this.formModelBinder = formModelBinder;
    }

    private async prepareWidgetOrder(config: FormContract): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "form",
            displayName: "Form",
            iconClass: "paperbits-form",
            requires: ["keyboard"],
            createModel: async () => {
                return await this.formModelBinder.nodeToModel(config);
            }
        }

        return widgetOrder;
    }

    private async getWidgetOrderByConfig(): Promise<IWidgetOrder> {
        let config: FormContract = {
            object: "block",
            type: "form",
            label: "Form",
            style: "default",
            formAction: "",
            nodes: [
                {
                    object: "block",
                    type: "input",
                    label: "Input",
                    style: "default",
                    inputType: "submit"
                }
            ]
        }
        return await this.prepareWidgetOrder(config);
    }

    public getWidgetOrder(): Promise<IWidgetOrder> {
        return Promise.resolve(this.getWidgetOrderByConfig());
    }
}