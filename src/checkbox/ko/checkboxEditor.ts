import * as ko from "knockout";
import template from "./checkboxEditor.html";
import { StyleService } from "@paperbits/styles";
import { CheckboxModel } from "../checkboxModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";


@Component({
    selector: "checkbox-editor",
    template: template
})
export class CheckboxEditor {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly required: ko.Observable<boolean>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly invalidFeedback: ko.Observable<string>;

    public readonly appearanceStyle: ko.Observable<string>;
    public readonly appearanceStyles: ko.ObservableArray<any>;

    constructor(private readonly styleService: StyleService) {
        this.label = ko.observable<string>();
        this.name = ko.observable<string>();
        this.required = ko.observable<boolean>();
        this.readonly = ko.observable<boolean>();
        this.invalidFeedback = ko.observable<string>();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }

    @Param()
    public model: CheckboxModel;

    @Event()
    public onChange: (model: CheckboxModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.label(this.model.label);
        this.name(this.model.name);
        this.required(this.model.required);
        this.readonly(this.model.readonly);
        this.invalidFeedback(this.model.invalidFeedback);

        if (this.model.styles) {
            const variations = await this.styleService.getComponentVariations("formGroup");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle(<string>this.model.styles?.appearance);
        }

        this.appearanceStyle.subscribe(this.applyChanges);
        this.label.subscribe(this.applyChanges);
        this.name.subscribe(this.applyChanges);
        this.required.subscribe(this.applyChanges);
        this.readonly.subscribe(this.applyChanges);
        this.invalidFeedback.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.label = this.label();
        this.model.name = this.name();
        this.model.readonly = this.readonly();
        this.model.required = this.required();
        this.model.invalidFeedback = this.invalidFeedback();

        this.model.styles = {
            appearance: this.appearanceStyle()
        };

        this.onChange(this.model);
    }
}