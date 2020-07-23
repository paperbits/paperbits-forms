import * as ko from "knockout";
import template from "./submitEditor.html";
import { StyleService } from "@paperbits/styles";
import { SubmitModel } from "../submitModel";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";


@Component({
    selector: "submit-editor",
    template: template
})
export class SubmitEditor {
    public readonly label: ko.Observable<string>;
    public readonly appearanceStyle: ko.Observable<string>;
    public readonly appearanceStyles: ko.ObservableArray<any>;

    constructor(private readonly styleService: StyleService) {
        this.label = ko.observable<string>();
        this.appearanceStyles = ko.observableArray();
        this.appearanceStyle = ko.observable();
    }

    @Param()
    public model: SubmitModel;

    @Event()
    public onChange: (model: SubmitModel) => void;

    @OnMounted()
    public async initialize(): Promise<void> {
        this.label(this.model.label);

        if (this.model.styles) {
            const variations = await this.styleService.getComponentVariations("button");
            this.appearanceStyles(variations.filter(x => x.category === "appearance"));
            this.appearanceStyle(<string>this.model.styles?.appearance);
        }

        this.appearanceStyle.subscribe(this.applyChanges);
        this.label.subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.label = this.label();
        this.model.styles = {
            appearance: this.appearanceStyle()
        };

        this.onChange(this.model);
    }
}