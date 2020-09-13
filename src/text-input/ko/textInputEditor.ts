import * as ko from "knockout";
import template from "./textInputEditor.html";
import { StyleService } from "@paperbits/styles";
import { TextInputModel } from "../textInputModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";


@Component({
    selector: "text-input-editor",
    template: template
})
export class TextInputEditor {
    public readonly label: ko.Observable<string>;
    public readonly value: ko.Observable<string>;
    public readonly placeholder: ko.Observable<string>;
    public readonly appearanceStyle: ko.Observable<string>;
    public readonly appearanceStyles: ko.ObservableArray<any>;

    constructor(private readonly styleService: StyleService) {
        this.label = ko.observable<string>();
        this.value = ko.observable<string>();
        this.placeholder = ko.observable<string>();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }

    @Param()
    public model: TextInputModel;

    @Event()
    public onChange: (model: TextInputModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.label(this.model.label);
        this.value(this.model.value);

        if (this.model.styles) {
            const variations = await this.styleService.getComponentVariations("formControl");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle(<string>this.model.styles?.appearance);
        }

        this.appearanceStyle.subscribe(this.applyChanges);
        this.label.subscribe(this.applyChanges);
        this.value.subscribe(this.applyChanges);
        this.placeholder.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.label = this.label();
        this.model.value = this.value();
        this.model.placeholder =this.placeholder();

        this.model.styles = {
            appearance: this.appearanceStyle()
        };

        this.onChange(this.model);
    }
}