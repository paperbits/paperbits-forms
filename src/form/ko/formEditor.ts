/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import * as ko from "knockout";
import template from "./formEditor.html";
import { Component, OnMounted, Param, Event } from "@paperbits/common/ko/decorators";
import { ChangeRateLimit } from "@paperbits/common/ko/consts";
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

    constructor() {
        this.formAction = ko.observable<string>();
        this.formMethod = ko.observable<string>();
        this.formTarget = ko.observable<string>();
        this.acceptCharset = ko.observable<string>();
        this.encType = ko.observable<string>();
        this.identifier = ko.observable<string>();
        this.isInline = ko.observable<boolean>();
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

        this.formAction
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

        this.formMethod
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

        this.formTarget
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

        this.acceptCharset
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

        this.encType
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

        this.identifier
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);

        this.isInline
            .extend(ChangeRateLimit)
            .subscribe(this.applyChanges);
    }

    private applyChanges(): void {
        this.model.formAction = this.formAction();
        this.model.formMethod = this.formMethod();
        this.model.formTarget = this.formTarget();
        this.model.acceptCharset = this.acceptCharset();
        this.model.encType = this.encType();
        this.model.identifier = this.identifier();
        this.model.isInline = this.isInline();

        this.onChange(this.model);
    }
}
