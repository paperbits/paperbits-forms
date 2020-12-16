/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import * as ko from "knockout";
import template from "./formEditor.html";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { FormModel } from "../formModel";


@Component({
    selector: "form-editor",
    template: template
})
export class FormEditor {
    public readonly formAction: ko.Observable<string>;
    public readonly formMethod?: ko.Observable<string>;
    public readonly formTarget?: ko.Observable<string>;
    public readonly acceptCharset?: ko.Observable<string>;
    public readonly encType?: ko.Observable<string>;
    public readonly identifier?: ko.Observable<string>;
    public readonly isInline?: ko.Observable<boolean>;

    public itemNameToAdd: ko.Observable<string>;
    public itemValueToAdd: ko.Observable<string>;
    public selectedItems: ko.ObservableArray<string>;

    constructor() {
        this.formAction = ko.observable<string>();
        this.formMethod = ko.observable<string>();
        this.formTarget = ko.observable<string>();
        this.acceptCharset = ko.observable<string>();
        this.encType = ko.observable<string>();
        this.identifier = ko.observable<string>();
        this.isInline = ko.observable<boolean>();

        this.formAction.subscribe(((newValue) => { this.model.formAction = newValue; this.onChange(this.model); }).bind(this));
        this.formMethod.subscribe(((newValue) => { this.model.formMethod = newValue; this.onChange(this.model); }).bind(this));
        this.formTarget.subscribe(((newValue) => { this.model.formTarget = newValue; this.onChange(this.model); }).bind(this));
        this.acceptCharset.subscribe(((newValue) => { this.model.acceptCharset = newValue; this.onChange(this.model); }).bind(this));
        this.encType.subscribe(((newValue) => { this.model.encType = newValue; this.onChange(this.model); }).bind(this));
        this.identifier.subscribe(((newValue) => { this.model.identifier = newValue; this.onChange(this.model); }).bind(this));
        this.isInline.subscribe(((newValue) => { this.model.isInline = newValue; this.onChange(this.model); }).bind(this));

        this.itemNameToAdd = ko.observable("");
        this.itemValueToAdd = ko.observable("");
        this.selectedItems = ko.observableArray([]);
    }

    @Param()
    public model: FormModel;

    @Event()
    public onChange: (model: FormModel) => void;

    @OnMounted()
    public initialize(): void {
        this.formAction(this.model.formAction);
        this.formMethod(this.model.formMethod || "get");
        this.formTarget(this.model.formTarget || "_self");
        this.acceptCharset(this.model.acceptCharset);
        this.encType(this.model.encType || "application/x-www-form-urlencoded");
        this.identifier(this.model.identifier);
        this.isInline(this.model.isInline);
    }
}
