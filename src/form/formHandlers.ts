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
                const firstNameModel = new InputModel("text");
                firstNameModel.setProperty("labelText", "First name");
                firstNameModel.setProperty("inputName", "firstName");
                firstNameModel.setProperty("placeholderText", "e.g. John");
                firstNameModel.setProperty("isRequired", true);

                const lastNameModel = new InputModel("text");
                lastNameModel.setProperty("labelText", "Last name");
                lastNameModel.setProperty("inputName", "lastName");
                lastNameModel.setProperty("placeholderText", "e.g. Doe");
                lastNameModel.setProperty("isRequired", true);

                const submitModel = new InputModel("submit");
                submitModel.setProperty("inputValue", "Register");
                submitModel.setProperty("labelText", "Register");

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