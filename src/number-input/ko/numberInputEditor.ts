import * as ko from "knockout";
import template from "./numberInputEditor.html";
import { StyleService } from "@paperbits/styles";
import { NumberInputModel } from "../numberInputModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";


@Component({
    selector: "number-input-editor",
    template: template
})
export class NumberInputEditor {
    public readonly label: ko.Observable<string>;
    public readonly name: ko.Observable<string>;
    public readonly value: ko.Observable<number>;
    public readonly placeholder: ko.Observable<string>;
    public readonly required: ko.Observable<boolean>;
    public readonly readonly: ko.Observable<boolean>;
    public readonly min: ko.Observable<number>;
    public readonly max: ko.Observable<number>;

    public readonly appearanceStyle: ko.Observable<string>;
    public readonly appearanceStyles: ko.ObservableArray<any>;

    constructor(private readonly styleService: StyleService) {
        this.label = ko.observable<string>();
        this.name = ko.observable<string>();
        this.value = ko.observable<number>();
        this.required = ko.observable<boolean>();
        this.readonly = ko.observable<boolean>();
        this.min = ko.observable<number>();
        this.max = ko.observable<number>();
        this.placeholder = ko.observable<string>();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }

    @Param()
    public model: NumberInputModel;

    @Event()
    public onChange: (model: NumberInputModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.label(this.model.label);
        this.name(this.model.name);
        this.value(this.model.value);
        this.placeholder(this.model.placeholder);
        this.required(this.model.required);
        this.readonly(this.model.readonly);
        this.min(this.model.min);
        this.max(this.model.max);

        if (this.model.styles) {
            const variations = await this.styleService.getComponentVariations("formControl");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle(<string>this.model.styles?.appearance);
        }

        this.appearanceStyle.subscribe(this.applyChanges);
        this.label.subscribe(this.applyChanges);
        this.name.subscribe(this.applyChanges);
        this.value.subscribe(this.applyChanges);
        this.required.subscribe(this.applyChanges);
        this.readonly.subscribe(this.applyChanges);
        this.min.subscribe(this.applyChanges);
        this.max.subscribe(this.applyChanges);
        this.placeholder.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.label = this.label();
        this.model.name = this.name();
        this.model.value = this.value();
        this.model.readonly = this.readonly();
        this.model.required = this.required();
        this.model.min = this.min();
        this.model.max = this.max();
        this.model.placeholder = this.placeholder();

        this.model.styles = {
            appearance: this.appearanceStyle()
        };

        this.onChange(this.model);
    }
}