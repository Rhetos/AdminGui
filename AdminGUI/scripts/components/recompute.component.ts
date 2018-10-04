import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { IEmptyConstruct, AppSettings } from "basecode/core";
import { MessageService } from "../services/message.service";

@Component({
    selector: 'recompute',
    template: `
       <div *ngIf="filterType">
        <generic-detail [entityType] = "filterType" [submitButtonName] = "'Recompute'" [formTitle] = "'ReComputeTarget'" [showCloseButton]="false" (formSubmitted)="onReCompute($event)"> </generic-detail>
       </div>
`
})
export class ReComputeComponent {
    /**Type of filter */
    @Input() filterType: any = null;
    /**Name of target */
    @Input() target: string = "";
    /**Name of source */
    @Input() source: string = "";
    /**Name of module */
    @Input() module: string = "";
    @Input() nameFilter: string = "";

    @Output() reComputeEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() hideRecomputePopup: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private http: Http, 
        private messageService: MessageService) { }
    /**
     * @Recompute the data of target which have difference with data source
     * @param
     * @filter by pattern data
     */
    public onReCompute(filterData: any) {
        let computedSource = this.module + '.' + this.source;
        let computedTarget = this.module + '.' + this.target;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let body = (this.nameFilter && this.nameFilter != "")
            ? JSON.stringify({ Source: computedSource, Target: computedTarget, FilterName: this.nameFilter, FilterData: JSON.stringify(filterData.data[0]) })
            : JSON.stringify({ Source: computedSource, Target: computedTarget })

        this.hideRecomputePopup.emit("");

        this.http.post(AppSettings.API_ENDPOINT + "AdminGui/Recompute/", body, options).subscribe(
            (_) => {
                this.messageService.emitInfo('Computed Success','You updated the table: ' + this.target);
                this.reComputeEvent.emit("");
            },
            (_) => {
                this.messageService.emitError('Computed Fail','You fail to update the table: ' + this.target);
                this.reComputeEvent.emit("");
            },
            () => {
                this.reComputeEvent.emit("");
            }
        );
    }
    
}