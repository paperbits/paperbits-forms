/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license.
 */

import { InputProperty } from "./inputProperty";
import { WidgetModel } from "@paperbits/common/widgets";

export class InputModel { // implements WidgetModel {
    // Base properties for all inputs:
    // public name: string;
    // public value: string;
    // public assignErrors(error) - for future server side validation
    // public getErrors() - for validation summary

    public properties: InputProperty[];
    public options?: OptionItem[];

    constructor(public inputType: string) {
        this.properties = [];
        this.properties.push({ propertyName: "inputName", propertyValue: "" });
    }

    public getInputProperty = (propertyName: string) => this.properties.find((item) => item.propertyName === propertyName);

    public setProperty(name: string, value: any): void {
        if (!name) {
            return;
        }
        const propertyItem = this.getInputProperty(name);

        if (propertyItem) {
            propertyItem.propertyValue = value;
        }
        else {
            this.properties.push({
                propertyName: name,
                propertyValue: value
            });
        }
    }
}

export class OptionItem {
    public itemName: string;
    public itemValue: any;
}