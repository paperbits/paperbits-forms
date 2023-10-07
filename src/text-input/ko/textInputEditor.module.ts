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
            key: "formControl",
            name: "components_formControl",
            groupName: "Form controls",
            selectorTemplate: null,
            styleTemplate: styleTemplate
        };
        
        injector.bindInstanceToCollection("styleGroups", styleGroup);
        injector.bindInstanceToCollection("styleHandlers", FormControlStyleHandler);
    }
}


const getFormLabelStyle = (key: string): VariationContract => {
    return {
        key: key,
        displayName: "Label",
        typography: {
            colorKey: "colors/default"
        }
    };
};

const getFormControlStyle = (key: string): any => {
    return {
        default: {
            displayName: "Form control",
            key: key,
            category: "appearance",
            components: {
                formLabel: {
                    default: getFormLabelStyle(`${key}/components/formLabel/default`),
                }
            }
        }
    };
};

const getDefaultStyle = (key: string = `components/formControl/default`) => {
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
        case "formControl":
            return getFormControlStyle(key);
        case "formLabel":
            return getFormLabelStyle(key);
        default:
            return null;
    }
};

export const FormControlStyleHandler: StyleHandler = {
    key: "formControl",
    getDefaultStyle: getDefaultStyle
};

//  data-bind="styleableGlobal: variation.key + '/components/formLabel/default'"