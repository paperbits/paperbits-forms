import * as ko from "knockout";
import template from "./inputEditor.html";
import { IViewManager } from '@paperbits/common/ui';
import { IWidgetEditor } from '@paperbits/common/widgets';
import { Component } from "@paperbits/knockout/decorators/component";
import { InputModel } from "../../models";

@Component({
    selector: "input-editor",
    template: template,
    injectable: "inputEditor"
})
export class InputEditor implements IWidgetEditor {
    private model: InputModel;
    private applyChangesCallback: () => void;

    public readonly inputTypes = ko.observableArray(["text", "password", "submit", "reset", "radio", "checkbox", "color", "date", "email", "number", "range", "search", "time", "url", "hidden"]);

    public readonly labelFor: KnockoutObservable<string>;
    public readonly showLabel: KnockoutObservable<string>;   //"before" | "after" | "none"
    public readonly labelText: KnockoutObservable<string>;
    public readonly inputType: KnockoutObservable<string>;   //"text" | "password" | "submit" | "reset" | "radio" | "checkbox" | "button" | "color" | "date" | "email" | "number" | "range" | "search" | "time" | "url"
    public readonly inputName:KnockoutObservable<string>;
    public readonly placeholderText?: KnockoutObservable<string>;
    public readonly inputValue?: KnockoutObservable<string | number>;
    public readonly maxLength?: KnockoutObservable<number>;
    public readonly minValue?: KnockoutObservable<number>;
    public readonly maxValue?: KnockoutObservable<number>;
    public readonly sizeValue?: KnockoutObservable<number>;
    public readonly stepValue?: KnockoutObservable<number>;
    public readonly isRequired?: KnockoutObservable<boolean>;
    public readonly isReadonly?: KnockoutObservable<boolean>;
    public readonly isDisabled?: KnockoutObservable<boolean>;
    public readonly isChecked?: KnockoutObservable<boolean>;
    public readonly patternRegexp?: KnockoutObservable<string>;

    constructor(private viewManager: IViewManager) {
        this.labelFor   = ko.observable<string>();
        this.showLabel  = ko.observable<string>();
        this.labelText  = ko.observable<string>();
        this.inputType  = ko.observable<string>();
        this.inputName  = ko.observable<string>();
        this.inputValue = ko.observable<string | number>();
        this.maxLength  = ko.observable<number>();
        this.minValue   = ko.observable<number>();
        this.maxValue   = ko.observable<number>();
        this.sizeValue  = ko.observable<number>();
        this.stepValue  = ko.observable<number>();
        this.isRequired = ko.observable<boolean>();
        this.isReadonly = ko.observable<boolean>();
        this.isDisabled = ko.observable<boolean>();
        this.isChecked  = ko.observable<boolean>();
        this.placeholderText = ko.observable<string>();
        this.patternRegexp   = ko.observable<string>();
        this.onInputTypeChange = this.onInputTypeChange.bind(this);

        this.labelFor   .subscribe(((newValue) => {this.model.inputId    = newValue;this.applyChangesCallback();}).bind(this));
        this.showLabel  .subscribe(((newValue) => {this.model.showLabel  = newValue;this.applyChangesCallback();}).bind(this));
        this.labelText  .subscribe(((newValue) => {this.model.labelText  = newValue;this.applyChangesCallback();}).bind(this));
        this.inputType  .subscribe(this.onInputTypeChange);
        this.inputName  .subscribe(((newValue) => {this.model.inputName  = newValue;this.applyChangesCallback();}).bind(this));
        this.inputValue .subscribe(((newValue) => {this.model.inputValue = newValue;this.applyChangesCallback();}).bind(this));
        this.maxLength  .subscribe(((newValue) => {this.model.maxLength  = newValue;this.applyChangesCallback();}).bind(this));
        this.minValue   .subscribe(((newValue) => {this.model.minValue   = newValue;this.applyChangesCallback();}).bind(this));
        this.maxValue   .subscribe(((newValue) => {this.model.maxValue   = newValue;this.applyChangesCallback();}).bind(this));
        this.sizeValue  .subscribe(((newValue) => {this.model.sizeValue  = newValue;this.applyChangesCallback();}).bind(this));
        this.stepValue  .subscribe(((newValue) => {this.model.stepValue  = newValue;this.applyChangesCallback();}).bind(this));
        this.isRequired .subscribe(((newValue) => {this.model.isRequired = newValue;this.applyChangesCallback();}).bind(this));
        this.isReadonly .subscribe(((newValue) => {this.model.isReadonly = newValue;this.applyChangesCallback();}).bind(this));
        this.isDisabled .subscribe(((newValue) => {this.model.isDisabled = newValue;this.applyChangesCallback();}).bind(this));
        this.isChecked  .subscribe(((newValue) => {this.model.isChecked  = newValue;this.applyChangesCallback();}).bind(this));
        this.placeholderText.subscribe(((newValue) => {this.model.placeholderText = newValue;this.applyChangesCallback();}).bind(this));
        this.patternRegexp  .subscribe(((newValue) => {this.model.patternRegexp   = newValue;this.applyChangesCallback();}).bind(this));

    }

    public setWidgetModel(model: InputModel, applyChangesCallback?: () => void): void {
        this.model = model;
        this.applyChangesCallback = applyChangesCallback;
        this.labelFor   (model.inputId);
        this.showLabel  (model.showLabel || "none");
        this.labelText  (model.labelText);
        this.inputType  (model.inputType || "text");
        this.inputName  (model.inputName );
        this.inputValue (model.inputValue);
        this.maxLength  (model.maxLength );
        this.minValue   (model.minValue  );
        this.maxValue   (model.maxValue  );
        this.sizeValue  (model.sizeValue );
        this.stepValue  (model.stepValue );
        this.isRequired (model.isRequired);
        this.isReadonly (model.isReadonly);
        this.isDisabled (model.isDisabled);
        this.isChecked  (model.isChecked );
        this.placeholderText(model.placeholderText);
        this.patternRegexp  (model.patternRegexp  );

    }

    private onInputTypeChange(newValue) {
        if(this.model && this.model.inputType !== newValue) {
            this.model.inputType = newValue;
            
            this.applyChangesCallback();
        }
    }

    public closeEditor(): void {
        this.viewManager.closeWidgetEditor();
    }
}