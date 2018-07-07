import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { FormModel } from "./formModel";
import { InputModel } from "../input/inputModel";

export class FormHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "form",
            displayName: "Form",
            iconClass: "paperbits-form",
            requires: ["keyboard"],
            createModel: async () => {
                const firstNameModel = new InputModel();
                firstNameModel.inputType = "text";
                firstNameModel.labelText = "First name";
                firstNameModel.inputName = "firstName";
                firstNameModel.showLabel = "before";
                firstNameModel.placeholderText = "e.g. John";
                firstNameModel.isRequired = true;

                const lastNameModel = new InputModel();
                lastNameModel.inputType = "text";
                lastNameModel.labelText = "Last name";
                lastNameModel.inputName = "firstName";
                lastNameModel.showLabel = "before";
                lastNameModel.placeholderText = "e.g. Doe";
                lastNameModel.isRequired = true;

                const submitModel = new InputModel();
                submitModel.inputValue = "Register";
                submitModel.inputType = "submit";

                const formModel = new FormModel();
                formModel.legendText = "New user";
                formModel.legendAlign = "top";
                formModel.isFieldset = true;
                formModel.widgets.push(firstNameModel);
                formModel.widgets.push(lastNameModel);
                formModel.widgets.push(submitModel);

                return formModel;
            }
        }

        return widgetOrder;
    }
}