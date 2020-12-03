import * as ko from "knockout";
import template from "./rangeInputEditor.html";
import { StyleService } from "@paperbits/styles";
import { RangeInputModel } from "../rangeInputModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";


@Component({
    selector: "range-input-editor",
    template: template
})
export class RangeInputEditor {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<number>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly minValue: ko.Observable<number>;
    public readonly maxValue: ko.Observable<number>;
    public readonly appearanceStyle: ko.Observable<string>;
    public readonly appearanceStyles: ko.ObservableArray<any>;

    constructor(private readonly styleService: StyleService) {
        this.label = ko.observable<string>();
        this.name = ko.observable<string>();
        this.value = ko.observable<number>();
        this.readonly = ko.observable<boolean>();
        this.minValue = ko.observable<number>();
        this.maxValue = ko.observable<number>();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }

    @Param()
    public model: RangeInputModel;

    @Event()
    public onChange: (model: RangeInputModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.label(this.model.label);
        this.name(this.model.name);
        this.minValue(this.model.minValue);
        this.maxValue(this.model.maxValue);
        this.value(this.model.value);
        this.readonly(this.model.readonly);

        if (this.model.styles) {
            const variations = await this.styleService.getComponentVariations("formControl");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle(<string>this.model.styles?.appearance);
        }

        this.appearanceStyle.subscribe(this.applyChanges);
        this.label.subscribe(this.applyChanges);
        this.name.subscribe(this.applyChanges);
        this.minValue.subscribe(this.applyChanges);
        this.maxValue.subscribe(this.applyChanges);
        this.value.subscribe(this.applyChanges);
        this.readonly.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.label = this.label();
        this.model.name = this.name();
        this.model.value = this.value();
        this.model.minValue = this.minValue();
        this.model.maxValue = this.maxValue();
        this.model.readonly = this.readonly();

        this.onChange(this.model);
    }
}