import { Component, ViewChild, ElementRef, AfterViewInit, EventEmitter, Injectable, NgZone } from '@angular/core'
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DataTable, Column, LazyLoadEvent, TabViewModule } from 'primeng/primeng';
import { AppSettings, MenuItem, DecoratorRegistrations, ControlDefinition } from 'basecode/core';
import { EntityClassProvider } from '../models/entity-class.provider';
import { InvalidDataService } from '../services/invalidata.service';
import { IInvalidDataFilter } from '../models/admingui-interface';
import { HistoryComponent } from './history.component';
import { MessageService } from '../services/message.service';

@Component({
    templateUrl: './templates/components/invalid-view.component.html',
    styleUrls: ['./css/components/invalid-view.component.css']
})
@Injectable()
export class InvalidViewComponent implements AfterViewInit {

    @ViewChild("invalidPopupModal") invalidPopupModal: ElementRef;

    private plainMenu: Array<MenuItem> = new Array<MenuItem>();
    private controls: ControlDefinition;
    private isChildrenShown: Array<boolean> = new Array<boolean>();

    private listCheckBox: Array<CheckBox> = new Array<CheckBox>();
    private listEntityNames: Array<any> = new Array<any>();

    private anchor: CheckBox;
    private isSelectAll: boolean = false;

    private percentTotalChecking: string = "0.00%";

    /** State of "Pause" button - true: could click to "pause" */
    private enablePause: boolean = false;

    /** State of "Resume"-"ResumeAll" button - true: could click to "resume" */
    private enableResume: boolean = false;

    /** State of "Stop" button - true: could click to "stop" */
    private enableStop: boolean = false;

    /** State of "Choose tables to check invalid" button - true: could click to "Choose Tables" */
    private enableChooseTables: boolean = false;

    /** Name of "Pause" button: Pause-Resume-ResumeAll */
    private buttonName: string = "Pause";

    /** Process is running or not - true: is running */
    private isChecking: boolean = false;

    /** Filters are chosen for tables or not*/
    private isChooseFilters: boolean = false;

    /** Pure data get from service */
    private data: Array<any> = [];

    /** Data after be sliced */
    private dataTable: Array<any> = [];

    /** Page size */
    private pageSize: number = 10;

    /** Current page index */
    private pageIndex: number = 1;

    /** Page links */
    private pageLinks: number = 1;

    /** Array of Filter for each column  */
    private listFilter: Array<any> = new Array<any>();

    /** Data get from filters */
    private filterData: any[];

    /**  */
    private emitCheckingResultSub: any;

    /** Link of busy picture*/
    private srclink: string = "./css/cog11.svg";

    /** Show or hide busy picture */
    private busy: boolean = false;

    private invalidEntitysWithFilter: any[];

    @ViewChild('table') table: DataTable;

    @ViewChild('history') history: HistoryComponent;
    private totalRecords: number = 0;

    private _http: Http;

    constructor(
        private invalidDataService: InvalidDataService, 
        private http: Http,
        private router: Router, 
        private messageService: MessageService) {
        DecoratorRegistrations.registeredDecorators.filter(x => x instanceof MenuItem).map(exDecorated => {
            if (exDecorated.Name == "Tables")
                this.plainMenu.push(exDecorated);
        });
        //this.plainMenu[0].Children.map(x => this.isChildrenShown.push(false));
        this.parseToCheckBox(this.plainMenu[0].Children, this.listCheckBox);
        this.addFiltersToEntity();
        this.listCheckBox.map(x => this.isChildrenShown.push(false));

        this._http = http;
        this.data = [];
        this.dataTable = [];
        this.filterData = [];
    }

    parseToCheckBox(menu: Array<MenuItem>, list: Array<CheckBox>) {
        var remain = menu.length;
        menu.forEach((x: MenuItem) => {
            var item = new CheckBox();
            item.name = x.Name;
            item.isChecked = false;
            item.numChildren = x.Children.length;
            item.isVisible = true;
            item.isShowChildren = false;
            list.push(item);
        });
        for (var i = 0; i < remain; i++) {
            this.parseToCheckBox(menu[i].Children, list[i].Children);
        }
    }

    ngOnInit() {
        this.getDataTable();

        this.invalidDataService.needResumeEmmiter.subscribe((needResume: boolean) => {
            if (needResume == true) {
                setTimeout(() => {
                    this.enableChooseTables = false;
                    this.enablePause = false;
                    this.enableResume = true;
                    this.enableStop = true;
                    this.buttonName = "ResumeAll";
                });
            }
            else {
                setTimeout(() => {
                    this.enableChooseTables = true;
                    this.enablePause = false;
                    this.enableResume = false;
                    this.enableStop = false;
                    this.buttonName = "Pause";
                });
            }
        });
        this.invalidDataService.isNeedResumeChecking();
        this.invalidDataService.noticeToGetCheckingResult();
    }

    onBack() {
        //window.history.back();
        (<any>jQuery(this.invalidPopupModal.nativeElement)).modal('hide');
    }

    onPause() {
        this.buttonName = "Resume";
        this.enablePause = false;
        this.enableResume = true;
        this.invalidDataService.pauseCheckingInvalidProcess();
        this.messageService.emitInfo('Pause','Checking is paused by user');
    }

    onResume() {
        this.buttonName = "Pause";
        this.enablePause = true;
        this.enableResume = false;

        this.invalidDataService.resumeCheckingInvalidDataProcess();
   
    }

    onCancel() {
        this.setDefaultButtons();
        this.invalidDataService.stopChecking();
        this.messageService.emitInfo('Stop', 'Checking is stopped by user');
    }

    onShowPopup() {
        this.enableChooseTables = true;
        (<any>jQuery(this.invalidPopupModal.nativeElement)).modal('show');
    }

    ngOnDestroy() {
        if (this.emitCheckingResultSub) this.emitCheckingResultSub.unsubscribe();
        (<any>jQuery(this.invalidPopupModal.nativeElement)).modal('hide');
    }

    ngAfterViewInit() {
        //TODO: Use other way to solve load menu instead of setTimeout
        setTimeout(() => {
            if (this.invalidDataService.isChecking()) {
                this.enablePause = true;
                this.enableResume = false;
                this.enableStop = true;
                this.enableChooseTables = false;
                this.buttonName = "Pause";
            }

            this.executeThemeScript();
        }, 100);
    }

    executeThemeScript() {
        if (CurrentTheme) {
            CurrentTheme.navigationInit(jQuery);
            jQuery(".nano").nanoScroller();
        }
    }
    toggleAllChildren(index: number) {
        this.listCheckBox[index].isChecked = !this.listCheckBox[index].isChecked;
        var check = this.listCheckBox[index].isChecked;

        //Update by VAN Huy
        for (var i = 0; i < this.listCheckBox[index].Children.length; i++) {
            for (var j = 0; j < this.listCheckBox[index].Children[i].Children.length; j++) {
                this.listCheckBox[index].Children[i].Children[j].isChecked = check;
            }
            this.listCheckBox[index].Children[i].isChecked = check;
        }
        this.updateStatusCheckbox();
        //ENd Update by VAN Huy
    }

    showChildren(index: number) {
        //this.isChildrenShown[index] = !this.isChildrenShown[index];
        this.listCheckBox[index].isShowChildren = !this.listCheckBox[index].isShowChildren;
        this.listCheckBox[index].Children.map(x => x.isShowChildren = false);
    }

    submitEntitesFilter() {
        this.busy = true;
        let tempStr: string[];
        this.invalidEntitysWithFilter = [];

        for (var i = 0; i < this.listCheckBox.length; i++) {
            for (var j = 0; j < this.listCheckBox[i].Children.length; j++) {
                let listStringInvalidFilter = "";
                tempStr = this.listCheckBox[i].Children[j].name.split(' ');
                let entityName = tempStr[0] + '.' + tempStr[1];
                for (var k = 0; k < this.listCheckBox[i].Children[j].Children.length; k++) {
                    if (this.listCheckBox[i].Children[j].Children[k].isChecked) {
                        this.listCheckBox[i].Children[j].Children[k].isChecked = false;
                        listStringInvalidFilter += this.listCheckBox[i].Children[j].Children[k].name + ',';
                    }
                }
                if (listStringInvalidFilter != "") {
                    listStringInvalidFilter = listStringInvalidFilter.substring(0, listStringInvalidFilter.length - 1);
                    this.invalidEntitysWithFilter.push({ EntityName: entityName, ListFilter: listStringInvalidFilter });
                }
                this.listCheckBox[i].Children[j].isChecked = false;
            }
            this.listCheckBox[i].isChecked = false;
        }
        this.isSelectAll = false;
        (<any>jQuery(this.invalidPopupModal.nativeElement)).modal('hide');

        this.data = [];
        this.filterData = [];
        this.isChooseFilters = false;
        //this.updateDataTable();
        this.percentTotalChecking = "0.00%";
        this.pageIndex = 1;
        this.pageLinks = 1;

        this.invalidDataService.initiallizeCheckingEmitter.subscribe((_: any) => {
            this.busy = false;
        });

        this.invalidDataService.startCheckInvalidData(this.invalidEntitysWithFilter);
        
        this.isChecking = false;
        this.enablePause = true;
        this.enableResume = false;
        this.enableStop = true;
        this.enableChooseTables = false;
    }

    toggleChildren(parentIdx: number, childIdx: number) {
        this.listCheckBox[parentIdx].Children[childIdx].isChecked = !(this.listCheckBox[parentIdx].Children[childIdx].isChecked);
        //update VanHuy
        var check = this.listCheckBox[parentIdx].Children[childIdx].isChecked;
        for (var i = 0; i < this.listCheckBox[parentIdx].Children[childIdx].Children.length; i++) {
            this.listCheckBox[parentIdx].Children[childIdx].Children[i].isChecked = check;
        }
        this.updateStatusCheckbox();
        //end update VanHuy
    }

    toggleAllCheckBox() {
        this.isSelectAll = !this.isSelectAll;
        this.isChooseFilters = this.isSelectAll;
        //Update By VanHUy
        for (var i = 0; i < this.listCheckBox.length; i++) {
            this.listCheckBox[i].isChecked = this.isSelectAll;
            for (var j = 0; j < this.listCheckBox[i].Children.length; j++) {
                this.listCheckBox[i].Children[j].isChecked = this.isSelectAll;

                for (var k = 0; k < this.listCheckBox[i].Children[j].Children.length; k++) {
                    this.listCheckBox[i].Children[j].Children[k].isChecked = this.isSelectAll; 
                }
            }
        }
        //end update
    }

    getDataTable() {
        this.emitCheckingResultSub = this.invalidDataService.checkingInvalidResultChangedEmitter.subscribe(() => {
            let data = this.invalidDataService.getCheckingInvalidResult();
            if (!data) {
                //Because there is nothing to do
                this.setDefaultButtons();
                return;
            }
            this.totalRecords = data.length;
            setTimeout(() => {
                this.table.paginate({ first: 0, rows: this.pageSize });
                
                this.table.pageLinks = Math.ceil(this.totalRecords / this.pageSize);
                this.table.totalRecords = this.totalRecords;

                this.pageLinks = this.table.pageLinks;
            });

            this.data = [];
            let totalRow: number = data.length;
            this.pageLinks = Math.ceil(totalRow / this.pageSize);
            if (this.pageLinks == 0) {
                this.pageIndex = 0;
            }
            let checkingPercent: number = 0;
            let id = 0;
            data.map((item: any) => {
                let module: string = item.EntityName.split('.')[0];
                let table: string = item.EntityName.split('.')[1];
                this.data.push({ ID: id, Module: module, Table: table, InvalidData: item.FilterName, Status: item.Status, NumInvalid: item.NumInvalid });
                id++;
                if (item.Status == "Check completed") {
                    checkingPercent += 1 / totalRow;
                }
                else if (item.Status != "Check not started") {
                    checkingPercent += (+(<string>item.Status).split(" ")[1].split("%")[0]) / 100 * 1 / totalRow;
                }
            });
            if (totalRow != 0) {
                this.updateProcessingBar(checkingPercent);
            }
            else {
                this.updateProcessingBar(1);
            }
            if (!this.invalidDataService.isChecking()) {
                setTimeout(() => this.history.loadCheckingHistory(), 100);
                this.setDefaultButtons();
            }
        });
    }

    private updateProcessingBar(value: number) {
        this.percentTotalChecking = "" + (Math.round(value * 10000) / 100).toFixed(2) + "%";
    }

    doubleClick(event: any) {
        if (this.data[event.data.ID].Status == 'Check completed') {
            this.invalidDataService.currentFilter = this.data[event.data.ID].InvalidData;
            this.router.navigateByUrl("/generic-grid/" + this.data[event.data.ID].Module + '.' + this.data[event.data.ID].Table);
        } else {
            this.messageService.emitInfo('Navigate failed', 'This row still not complete');
        }
    }

    private loadCheckingHistory(event: any) {
        if (event.index == 1)
            setTimeout(()=> this.history.loadCheckingHistory(),100);
    }

    private setDefaultButtons() {
        this.enablePause = false;
        this.enableResume = false;
        this.enableStop = false;
        this.enableChooseTables = true;
        this.buttonName = "Pause";
        this.listEntityNames = [];
        this.isChooseFilters = false;
    }


    private addFiltersToEntity() {

        for (var i = 0; i < this.listCheckBox.length; i++) {
            this.listCheckBox[i].isVisible = false;
            for (var j = 0; j < this.listCheckBox[i].Children.length; j++) {
                let tempStr = this.listCheckBox[i].Children[j].name.split(' ');
                let entityType = EntityClassProvider.mapEntity.getByID(tempStr[0] + '.' + tempStr[1]);

                let entity = new entityType();
                let entityName = entity.getModuleName() + '.' + entity.getEntityName();
                let listInvalidFilter: Array<IInvalidDataFilter> = entity.getInvalidDataDefinitions();
                let listStringInvalidFilter: string = "";
                if (listInvalidFilter.length > 0) {
                    listInvalidFilter.map(filter => {
                        listStringInvalidFilter += filter.filter + ','
                        var item = new CheckBox();
                        item.name = filter.filter;
                        item.isChecked = false;
                        item.numChildren = 0;
                        item.isVisible = true;
                        this.listCheckBox[i].Children[j].numChildren++;
                        this.listCheckBox[i].Children[j].Children.push(item);
                    });
                    this.listCheckBox[i].isVisible = true;
                }
                else {
                    this.listCheckBox[i].Children[j].isVisible = true;
                    //this.listCheckBox = this.listCheckBox.filter((item: CheckBox) => item.Children.length!=0);
                    
                }
                this.listCheckBox[i].isVisible = this.listCheckBox[i].isVisible || this.listCheckBox[i].Children[j].isVisible;   
            }
        }

        for (var i = 0; i < this.listCheckBox.length; i++) {
            let sizeOfChildren = this.listCheckBox[i].Children.length;
            for (var j = 0; j < sizeOfChildren; j++) {
                if (this.listCheckBox[i].Children[j].Children.length == 0) {
                    let cb: CheckBox = this.listCheckBox[i].Children[j];
                    this.listCheckBox[i].Children = this.listCheckBox[i].Children.filter((item: CheckBox) => item != cb);
                    sizeOfChildren--;
                    j--;
                }
            }
        }
        this.listCheckBox = this.listCheckBox.filter((item: CheckBox) => item.Children.length != 0);
    }

    private showDaughter(idxParent: number, idxChild: number) {
        this.listCheckBox[idxParent].Children[idxChild].isShowChildren = !this.listCheckBox[idxParent].Children[idxChild].isShowChildren;
    }

    private toggleDaughter(idxParent: number, idxChild: number, idxDaughter: number) {
        this.listCheckBox[idxParent].Children[idxChild].Children[idxDaughter].isChecked = !this.listCheckBox[idxParent].Children[idxChild].Children[idxDaughter].isChecked;
        this.updateStatusCheckbox();
    }

    private updateStatusCheckbox() {
        this.isChooseFilters = false;
        for (var i = 0; i < this.listCheckBox.length; i++) {
            let countChildCheck = 0;
            for (var j = 0; j < this.listCheckBox[i].Children.length; j++) {
                let countDaughterCheck = 0;
                for (var k = 0; k < this.listCheckBox[i].Children[j].Children.length; k++) {
                    if (this.listCheckBox[i].Children[j].Children[k].isChecked) {
                        countDaughterCheck++;
                        this.isChooseFilters = true;
                    }
                }
                if (countDaughterCheck == this.listCheckBox[i].Children[j].Children.length) {
                    this.listCheckBox[i].Children[j].isChecked = true;
                    countChildCheck++;
                } else {
                    this.listCheckBox[i].Children[j].isChecked = false;
                }
            }
            if (countChildCheck == this.listCheckBox[i].Children.length) {
                this.listCheckBox[i].isChecked = true;
            } else {
                this.listCheckBox[i].isChecked = false;
            }
        }
        this.isSelectAll = true;
        for (var count = 0; count < this.listCheckBox.length; count++) {
            if (this.listCheckBox[count].isChecked == false) {
                this.isSelectAll = false;
                break;
            }
        }
    }

    private changePageSize(event: any) {
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
}

export class CheckBox {
    name: string;
    isChecked: boolean;
    Children: Array<CheckBox>;
    numChildren: number;
    isVisible: boolean;
    isShowChildren: boolean;

    constructor() {
        this.name = "";
        this.isChecked = false;
        this.Children = new Array<CheckBox>();
        this.numChildren = 0;
        this.isVisible = true;
        this.isShowChildren = false;
    }
}
