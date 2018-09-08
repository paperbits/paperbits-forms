import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { FormModel } from "./formModel";
import { TextInputModel, SubmitInputModel } from "../input";


export class FormHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "form",
            displayName: "Form",
            iconClass: "paperbits-form",
            requires: ["keyboard"],
            createModel: async () => {
                const firstNameModel = new TextInputModel();
                firstNameModel.setProperty("labelText", "First name");
                firstNameModel.setProperty("inputName", "firstName");
                firstNameModel.setProperty("placeholderText", "e.g. John");
                firstNameModel.setProperty("isRequired", true);

                const lastNameModel = new TextInputModel();
                lastNameModel.setProperty("labelText", "Last name");
                lastNameModel.setProperty("inputName", "lastName");
                lastNameModel.setProperty("placeholderText", "e.g. Doe");
                lastNameModel.setProperty("isRequired", true);

                const submitModel = new SubmitInputModel();
                submitModel.setProperty("inputValue", "Register");
                submitModel.setProperty("labelText", "Register");

                const formModel = new FormModel();
                formModel.widgets.push(firstNameModel);
                formModel.widgets.push(lastNameModel);
                formModel.widgets.push(submitModel);

                return formModel;
            }
        };

        return widgetOrder;
    }
}