import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Injectable, NgZone, OnInit } from '@angular/core'
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DataTable, Column, LazyLoadEvent, TabViewModule } from 'primeng/primeng';

import { AppSettings, NotificationService, ControlDefinition, MenuItem, DecoratorRegistrations } from 'basecode/core';
import { EntityClassProvider } from '../models/entity-class.provider';
import { InvalidDataService } from '../services/invalidata.service';
import { IInvalidDataFilter } from '../models/admingui-interface';

@Component({
    selector: 'history',
    templateUrl: './templates/components/history.component.html'
})
export class HistoryComponent implements AfterViewInit {
    /** Pure data get from service */
    private pureData: Array<any> = [];

    /** Page size */
    private pageSize: number = 10;

    /** Maximun page */
    private pageLinks: number = 1;

    /** Total Records*/
    private totalRecords: number = 0;

    /** Detail data show on popup */
    private detailData: Array<any> = [];

    /** DetailData Page size */
    private detailPageSize: number = 10;

    /** DetailData Maximun page */
    private detailPageLinks: number = 1;

    /** DetailData Total Records*/
    private detailTotalRecords: number = 0;

    /** Show or hide busy picture for History page*/
    private busy: boolean = false;

    /** Show or hide busy picture for History popup */
    private detailBusy: boolean = false;
    /** Link of busy picture*/
    private srclink: string = "./css/cog11.svg";

    @ViewChild("historyPopupModal") historyPopupModal: ElementRef;

    @ViewChild('table') table: DataTable;

    @ViewChild('detailTable') detailTable: DataTable;

    constructor(private invalidDataService: InvalidDataService,
        private http: Http,
        private router: Router,
        private notifications: NotificationService) {

    }

    loadCheckingHistory() {
        this.pureData = [];
        this.invalidDataService.getHistoryChecking().then((data: any) => {
            if (data) {
                data.map((item: any) => {
                    this.pureData.push({ ID: item.ID, CheckingDate: item.CheckingDate, CheckingTime: item.CheckingTime, Status: item.Status });
                });
                this.getInitPaginator();
            }

        });
        
        
    }

    ngAfterViewInit() {

    }

    doubleClick(event: any) {
        this.detailData = [];
        this.invalidDataService.getHistoryCheckingResultByID(event.data.ID).then((data: any) => {
            if (data) {
                data.map((item: any) => {
                    let module: string = item.EntityName.split('.')[0];
                    let table: string = item.EntityName.split('.')[1];
                    this.detailData.push({ Module: module, Table: table, InvalidData: item.FilterName, Status: item.Status, NumInvalid: item.NumInvalid });
                });
                this.getInitDetailPaginator();
            }
            (<any>jQuery(this.historyPopupModal.nativeElement)).modal('show');
        });

        
    }

    changePageSize(event: any) {
        this.busy = true;
        if (this.pageSize < 1) {
            event.preventDefault();
            event.target.value = 1;
            this.pageSize = 1;
        }
        else if (this.pageSize > this.totalRecords) {
            event.preventDefault();
            event.target.value = this.totalRecords;
            this.pageSize = this.totalRecords;
        }

        this.table.totalRecords = 0;
        setTimeout(() => {
            this.table.paginate({ first: 0, rows: this.pageSize });

            this.table.pageLinks = Math.ceil(this.totalRecords / this.pageSize);
            this.pageLinks = this.table.pageLinks;

            this.table.totalRecords = this.totalRecords;

            this.busy = false;
        });
    }

    changeDetailPageSize(event: any) {
        this.detailBusy = true;
        if (this.detailPageSize < 1) {
            event.preventDefault();
            event.detailPageSize.value = 1;
            this.detailPageSize = 1;
        }
        else if (this.detailPageSize > this.detailTotalRecords) {
            event.preventDefault();
            event.target.value = this.detailTotalRecords;
            this.detailPageSize = this.detailTotalRecords;
        }

        this.detailTable.totalRecords = 0;
        setTimeout(() => {
            this.detailTable.paginate({ first: 0, rows: this.detailPageSize });

            this.detailTable.pageLinks = Math.ceil(this.detailTotalRecords / this.detailPageSize);
            this.detailPageLinks = this.detailTable.pageLinks;

            this.detailTable.totalRecords = this.detailTotalRecords;

            this.detailBusy = false;
        });
    }

    onHistoryBack() {
        (<any>jQuery(this.historyPopupModal.nativeElement)).modal('hide');
        this.setDefaultDetailPaginator();
    }

    getInitPaginator() {
        this.totalRecords = this.pureData.length;
        
        setTimeout(() => {
            this.table.paginate({ first: 0, rows: this.pageSize });
            this.table.pageLinks = Math.ceil(this.totalRecords / this.pageSize);
            this.table.totalRecords = this.totalRecords;
            this.pageLinks = this.table.pageLinks;
        });
    }

    getInitDetailPaginator() {
        this.detailTotalRecords = this.detailData.length;

        setTimeout(() => {
            this.detailTable.paginate({ first: 0, rows: this.detailPageSize });
            this.detailTable.pageLinks = Math.ceil(this.detailTotalRecords / this.detailPageSize);
            this.detailTable.totalRecords = this.detailTotalRecords;
            this.detailPageLinks = this.detailTable.pageLinks;
        });
    }

    setDefaultDetailPaginator() {
        this.detailPageSize = 10;
        this.detailPageLinks = 1;
    }
}