/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by a Commercial license that can be found in the LICENSE file and at https://paperbits.io/license/commercial.
 */

import * as ko from "knockout";
import template from "./form.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
    selector: "paperbits-form",
    template: template
})
export class FormViewModel {
    public widgets: ko.ObservableArray<Object>;
    public formAction: ko.Observable<string>;
    public formMethod?: ko.Observable<string>;
    public formTarget?: ko.Observable<string>;
    public acceptCharset?: ko.Observable<string>;
    public encType?: ko.Observable<string>;
    public identifier: ko.Observable<string>;
    public formName?: ko.Observable<string>;
    public description?: ko.Observable<string>;
    public isInline?: ko.Observable<boolean>;

    constructor() {
        this.widgets = ko.observableArray<Object>();

        this.formAction = ko.observable<string>();
        this.formMethod = ko.observable<string>();
        this.formTarget = ko.observable<string>();
        this.acceptCharset = ko.observable<string>();
        this.encType = ko.observable<string>();
        this.identifier = ko.observable<string>();
        this.formName = ko.observable<string>();
        this.description = ko.observable<string>();
        this.isInline = ko.observable<boolean>();
    }
}