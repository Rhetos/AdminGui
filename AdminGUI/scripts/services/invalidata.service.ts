import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { IEntityDataService, IEmptyConstruct, NotificationService, AppSettings} from 'basecode/core';

import { IInvalidEntity, IInvalidFilter, IInvalidChunk, IInvalidDataFilter } from '../models/admingui-interface';

const headers = new Headers({ 'Content-Type': 'application/json' });;
const options = new RequestOptions({ headers: headers });

@Injectable()
export class InvalidDataService {
    private invalidEnitityStructure: Array<IInvalidEntity> = [];
    private invalidEntitysWithFilter: Array<any> = [];
    private createCheckingStructureEmitter: EventEmitter<any> = new EventEmitter<any>();
    private loadCheckingStructureEmitter: EventEmitter<any> = new EventEmitter<any>();
    private updateInvalidEmitter: EventEmitter<any> = new EventEmitter<any>();

    private checkingInvalidResult: any;

    private isUnderChecking: boolean = false;
    private stopCheckingInvalid: boolean = false;
    private pauseCheckingInvalid: boolean = false;

    private idxEntityCurrentChecking: number = 0;
    private idxFilterCurrentChecking: number = 0;
    private idxChunkCurrentChecking: number = 0;
    private maxChunkPerChecking: number = 10;
    private numCurrentRequest: number = 0;

    public needResumeEmmiter: EventEmitter<boolean> = new EventEmitter<boolean>();
    public checkingInvalidResultChangedEmitter: EventEmitter<any> = new EventEmitter<any>();
    public initiallizeCheckingEmitter: EventEmitter<any> = new EventEmitter<any>();
    public currentFilter: any = "";


    constructor(
        private http: Http,
        private notifications: NotificationService
    ) {
        this.createCheckingStructureEmitter.subscribe((_: any) => {
            this.initailizeAndCheckInvalidData();
        });

        this.loadCheckingStructureEmitter.subscribe((_: any) => {
            this.isUnderChecking = true;
            this.idxEntityCurrentChecking = 0;
            this.idxFilterCurrentChecking = 0;
            this.idxChunkCurrentChecking = 0;
            this.numCurrentRequest = 0;

            this.getCheckingResultFromServer();
            this.initiallizeCheckingEmitter.emit("load complete");
            //StartCheck
            this.checkInvalidData(true);
        });

        this.updateInvalidEmitter.subscribe((_: any) => {
            this.getCheckingResultFromServer();
        });

        this.getCheckingResultFromServer();
    }

    startCheckInvalidData(invalidEntitysWithFilter: any[]) {
        this.invalidEntitysWithFilter = invalidEntitysWithFilter;
        this.stopCheckingInvalid = false;
        this.isUnderChecking = true;

        this.createCheckingInvalidStructure();

    }

    resumeCheckingInvalidDataProcess() {
        this.pauseCheckingInvalid = false;
        this.isUnderChecking = true;

        this.initailizeAndCheckInvalidData();
    }

    pauseCheckingInvalidProcess() {
        this.pauseCheckingInvalid = true;
        this.isUnderChecking = false;
    }

    stopChecking() {
        this.stopCheckingInvalid = true;
        this.isUnderChecking = false;
        let body = "{}";
        this.http.post(AppSettings.API_ENDPOINT + "CheckingInvalid/StopCheckingInvalid/", body, options).subscribe(
            (_) => {
                console.log("stop success");
            },
            (_) => {
                console.log("stop fail");
            }
        );
    }

    noticeToGetCheckingResult() {
        this.checkingInvalidResultChangedEmitter.emit("return result");
    }

    getCheckingInvalidResult() {
        return this.checkingInvalidResult;
    }

    isChecking() {
        return this.isUnderChecking;
    }



    isNeedResumeChecking() {
        this.http.get(AppSettings.API_ENDPOINT + 'CheckingInvalid/CheckedHistory/').subscribe(
            (data) => {
                if (data.json().Records.length > 0) {
                    this.needResumeEmmiter.emit(true);
                }

                else
                    this.needResumeEmmiter.emit(false);
                console.log("check need resume success");
            },
            (_) => {
                this.needResumeEmmiter.emit(false);
                console.log("check need resume fail");
            }
        );
    }

    getHistoryChecking(): Promise<any> {
        return this.http.get(AppSettings.API_ENDPOINT + 'CheckingInvalid/CheckingHistoryResult/').map(
            (data) => {
                return data.json().Records;
            }
            , (error: any) => {
                console.log('Could not load checking history. ERR: ' + error.toString());
                return;
            }).toPromise();
    }

    getHistoryCheckingResultByID(historyID: string): Promise<any> {
        return this.http.get(AppSettings.API_ENDPOINT + 'CheckingInvalid/CheckingResult/?Filters=[{\"Property\":\"HistoryID\",\"Operation\":\"Equal\", \"Value\":\"' + historyID + '"}]').map(
            (data) => {
                return data.json().Records;
            }
            , (error: any) => {
                console.log('Could not load checking history by id. ERR: ' + error.toString());
                return;
            }).toPromise();
    }

    private getCheckingResultFromServer() {
        this.http.get(AppSettings.API_ENDPOINT + 'CheckingInvalid/CheckingResult/?Filters=[{\"Property\":\"Lasted\",\"Operation\":\"Equal\", \"Value\":\"true\"}]').subscribe(
            (data) => {
                if (!this.pauseCheckingInvalid && !this.stopCheckingInvalid) {
                    this.checkingInvalidResult = data.json().Records;
                    this.checkSizeInvalidResult();
                    this.checkingInvalidResultChangedEmitter.emit("get checking result success");
                }

                console.log("get result success");
            },
            (_) => {
                console.log("get result fail");
            }
        );
    }

    private initailizeAndCheckInvalidData() {
        this.invalidEnitityStructure = [];

        this.http.get(AppSettings.API_ENDPOINT + "CheckingInvalid/CheckingDatastructure/").subscribe(
            (data) => {
                let records = data.json().Records;

                records.map((item: any) => {
                    let invalidEnitity: IInvalidEntity = this.invalidEnitityStructure.filter(entity => entity.entityName === item.EntityName)[0];

                    if (!invalidEnitity) {
                        invalidEnitity = { ID: item.EntityID, entityName: item.EntityName, numRecord: item.TotalRecord, listInvalidFilter: [] }
                        this.invalidEnitityStructure.push(invalidEnitity);
                    }

                    let invalidFilter = invalidEnitity.listInvalidFilter.filter(filter => filter.filterName === item.FilterName)[0];

                    if (!invalidFilter) {
                        invalidFilter = { ID: item.FilterID, filterName: item.FilterName, listInvalidChunk: [] };
                        invalidEnitity.listInvalidFilter.push(invalidFilter);
                    }

                    invalidFilter.listInvalidChunk.push({ ID: item.ID, startID: item.StartID, endID: item.EndID, numRecord: item.NumRecord, numInvalid: item.NumInvalid });
                });
                console.log("load success");
                this.checkSizeInvalidResult();
                this.loadCheckingStructureEmitter.emit("load completed");

            },
            (_) => {
                console.log("load fail");
            }
        );

    }

    private createCheckingInvalidStructure() {
        let data = JSON.stringify({ data: this.invalidEntitysWithFilter });
        let body = JSON.stringify({ EntityData: data });
        this.http.post(AppSettings.API_ENDPOINT + "CheckingInvalid/InitialCheckingAction/", body, options).subscribe(
            (_) => {
                this.createCheckingStructureEmitter.emit("create completed");
                console.log("create success");
            },
            (_) => {
                console.log("create fail");
            }
        );
    }

    private updateCheckingInvalidResult(invalidEntityID: string, invalidFilterID: string, invalidChunkID: string, numInvalid: number) {
        let body = JSON.stringify({ EntityID: invalidEntityID, FilterID: invalidFilterID, ChunkID: invalidChunkID, NumInvalid: numInvalid });

        this.http.post(AppSettings.API_ENDPOINT + "CheckingInvalid/UpdateInvalidData/", body, options).subscribe(
            (_) => {
                this.updateInvalidEmitter.emit("chunk is checked");
                this.numCurrentRequest--;
                if (this.idxEntityCurrentChecking <= this.invalidEnitityStructure.length - 1 && !this.stopCheckingInvalid && !this.pauseCheckingInvalid) {
                    this.checkInvalidData(false);
                }
                else if (this.numCurrentRequest == 0 && !this.stopCheckingInvalid && !this.pauseCheckingInvalid) {
                    this.isUnderChecking = false;
                    this.notifications.emitter.emit({ severity: 'info', summary: 'Check Completed', detail: 'Checking is complete, you could check it' });
                }
                    
            },
            (_) => { this.numCurrentRequest--; }
        );
    }

    private updateIndexCheckingCur() {
        ++this.idxChunkCurrentChecking;
        if (this.idxChunkCurrentChecking > this.invalidEnitityStructure[this.idxEntityCurrentChecking].listInvalidFilter[this.idxFilterCurrentChecking].listInvalidChunk.length - 1) {
            this.idxChunkCurrentChecking = 0;
            ++this.idxFilterCurrentChecking;
            if (this.idxFilterCurrentChecking > this.invalidEnitityStructure[this.idxEntityCurrentChecking].listInvalidFilter.length - 1) {
                this.idxFilterCurrentChecking = 0;
                ++this.idxEntityCurrentChecking;
            }
        }
    }

    private sendCheckingRequest() {
        let invalidEntityCurrent = this.invalidEnitityStructure[this.idxEntityCurrentChecking];
        let invalidFilterCurrrent = invalidEntityCurrent.listInvalidFilter[this.idxFilterCurrentChecking];
        let invalidChunkCurrent = invalidFilterCurrrent.listInvalidChunk[this.idxChunkCurrentChecking];

        this.updateIndexCheckingCur();
        this.numCurrentRequest++;
        this.http.get(AppSettings.API_ENDPOINT + "/" + invalidEntityCurrent.entityName.replace(".", "/") + "/TotalCount?Filters=["
            + "{\"Property\":\"ID\",\"Operation\":\"GreaterEqual\", \"Value\":\"" + invalidChunkCurrent.startID + "\"},"
            + "{ \"Property\":\"ID\",\"Operation\":\"LessEqual\", \"Value\":\"" + invalidChunkCurrent.endID + "\"},"
            + "{\"Filter\":\"" + invalidFilterCurrrent.filterName + "\"}]").subscribe(
            (data) => {
                invalidChunkCurrent.numInvalid = data.json().TotalCount;
                this.updateCheckingInvalidResult(invalidEntityCurrent.ID, invalidFilterCurrrent.ID, invalidChunkCurrent.ID, invalidChunkCurrent.numInvalid);
            },
            (_) => { this.numCurrentRequest--; }
            );

    }

    private checkInvalidData(isIntial: boolean) {
        if (this.idxEntityCurrentChecking > this.invalidEnitityStructure.length - 1) {
            this.isUnderChecking = false;
            return;
        }
           

        if (isIntial) {
            isIntial = false;
            for (var i = 1; i <= this.maxChunkPerChecking; i++) {
                this.sendCheckingRequest();
                if (this.idxEntityCurrentChecking > this.invalidEnitityStructure.length - 1)
                    return;
            }
        } else {
            this.sendCheckingRequest();

        }
    }

    private checkSizeInvalidResult() {
        if (!this.checkingInvalidResult || this.checkingInvalidResult.length == 0) {
            this.isUnderChecking = false;
            return;
        }
    }
}