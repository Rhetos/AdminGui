﻿import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { GenericFormComponent, IEmptyConstruct, NotificationService, AppSettings } from "basecode/core";


@Component({
    selector: 'diff',
    template: `
       <div *ngIf="filterType">
        <generic-detail [entityType] = "filterType" [submitButtonName] = "'Diff'" [formTitle] = "'DiffSourceTarget'" [showCloseButton]="false" (formSubmitted)="onDiff($event)"> </generic-detail>
       </div>
`
})
export class DiffComponent {

    /** Type of filter */
    @Input() filterType: any = null;

    /** Name of target entity */
    @Input() target: string = "";
    /** Name of source entity */
    @Input() source: string = "";

    /** Module name */
    @Input() module: string = "";

    /** Name of filter */
    @Input() nameFilter: string = "";

    /** Number of records */
    @Input() numRecord: number = 10;

    /** Convert data to bytes */
    private bytesData: number[];

    /**  Emit json data string*/
    @Output() diffEvent: EventEmitter<any> = new EventEmitter<any>();

    /**  Emit to hide popup of Diff*/
    @Output() hideDiffPopup: EventEmitter<any> = new EventEmitter<any>();

    /**  Emit flag to show busy overlay*/
    @Output() stateBusy: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: Http, private notificationService: NotificationService) { }

    /**
     * @onDiff
     * @param filterData
     * @Get json data by using GET method Diff and emit jsonData.
     */
    public onDiff(filterData: any) {
        let computedSource = this.module + '.' + this.source;
        let computedTarget = this.module + '.' + this.target;

        let body = (this.nameFilter && this.nameFilter != "")
            ? JSON.stringify({ Source: computedSource, Target: computedTarget, FilterName: this.nameFilter, FilterData: JSON.stringify(filterData.data[0]), NumRecord: this.numRecord })
            : JSON.stringify({ Source: computedSource, Target: computedTarget, NumRecord: this.numRecord })
        this.hideDiffPopup.emit("");

        this.http.get(AppSettings.API_ENDPOINT +'AdminGUI/Diff/?parameter=' + body).subscribe(
            (_) => {
                this.bytesData = _.json().ReportFile;
                let jsonString: string = String.fromCharCode.apply(String, this.bytesData);
                let jsonData = JSON.parse(jsonString);
                this.diffEvent.emit(jsonData);
                this.stateBusy.emit(false);
            },
            (_) => {
                console.log('Data fetch failure: ' + _);
                this.stateBusy.emit(false);
            },
            () => {
                this.stateBusy.emit(false);
            }
        );
    }
}