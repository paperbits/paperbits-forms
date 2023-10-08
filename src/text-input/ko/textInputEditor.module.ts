import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { IStyleGroup, StyleHandler, VariationContract } from "@paperbits/common/styles";
import { TextInputEditor } from "./textInputEditor";
import { TextInputHandlers } from "../textInputHandlers";
import styleTemplate from "./styleGuideSnippet.html";

export class TextInputEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("textInputEditor", TextInputEditor);
        injector.bindToCollection("widgetHandlers", TextInputHandlers, "textInputHandler");

        const styleGroup: IStyleGroup = {
            key: "formGroup",
            name: "components_formGroup",
            groupName: "Form controls",
            selectorTemplate: null,
            styleTemplate: styleTemplate
        };

        injector.bindInstanceToCollection("styleGroups", styleGroup);
        injector.bindInstanceToCollection("styleHandlers", FormGroupStyleHandler);
    }
}


const getFormLabelStyle = (key: string): VariationContract => {
    return {
        key: key,
        displayName: "Label"
    };
};

const getFormControlStyle = (key: string): VariationContract => {
    return {
        key: key,
        displayName: "Form control"
    };
};

const getFormControlFeedbackStyle = (key: string): VariationContract => {
    return {
        key: key,
        displayName: "Validation error"
    };
};

const getFormGroupStyle = (key: string): VariationContract => {
    return {
        displayName: "Form group",
        key: key,
        category: "appearance",
        components: {
            formLabel: {
                default: getFormLabelStyle(`${key}/components/formLabel/default`),
            },
            formControl: {
                default: getFormControlStyle(`${key}/components/formControl/default`),
            }
        }
    };
};

const getDefaultStyle = (key: string = `components/formGroup/default`): VariationContract => {
    if (!key.startsWith("components/formGroup")) {
        return null;
    }

    const regex = /components\/(\w*)\/(\w*)/gm;

    let matches;

    const components = [];

    while ((matches = regex.exec(key)) !== null) {
        if (matches.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        const component = matches[1];
        const variation = matches[2];

        components.push(component);
    }

    const component = components[components.length - 1];

    switch (component) {
        case "formGroup":
            return getFormGroupStyle(key);
        case "formLabel":
            return getFormLabelStyle(key);
        case "formControl":
            return getFormControlStyle(key);
        case "invalidFeedback":
            return getFormControlFeedbackStyle(key);
        default:
            debugger;
            return null;
    }
};

export const FormGroupStyleHandler: StyleHandler = {
    key: "formGroup",
    getDefaultStyle: getDefaultStyle
};