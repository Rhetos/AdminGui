import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IEmptyConstruct, IEntityDataService, IDataStructure, GenericFormComponent, EntityChangeService, EntityWithType } from 'basecode/core';
import { EntityClassProvider } from '../models/entity-class.provider';
import { MessageService } from '../services/message.service';


@Component({
    templateUrl: './templates/components/diff-view.component.html',
    //directives: [GenericFormComponent]
})
export class DiffViewComponent {
    /** Type of entity*/
    private entityType: any = null;
    private entityID: any = null;
    private entity: any = null;
    private entitySub: any = null;

    /** Type of source entity*/
    private entitySourceType: any = null;
    private entitySource: any = null;

    /** Subscription ID Entity Changed*/
    private entityIDSub: any = null;
    private entityIDSourceSub: any = null;
    /** Array of Type Entity Target*/
    public entityTypeArray: Array<EntityWithType> = [];

    /** Array of Type Entity Source*/
    public entitySourceTypeArray: Array<EntityWithType> = [];

    /** Parameter from URL*/

    /** Show or hide Update button */
    public showSubmitBuntton: boolean = true;

    private title: string = "";
    private subTitle: string = "";

    /** Name target entity */
    private target: string = "";

    /** Name source entity */
    private source: string = "";

    /** Name source and target's module */
    private module: string = "";

    private titleTarget: string = "Target";
    private titleSource: string = "Source";
    private operatorInsert: boolean = false;
    private operatorUpdate: boolean = false;
    private operatorDelete: boolean = false;
    /** Get form popup from DOM */
    @ViewChild("diffPopupModal") modalPopup: ElementRef;

    /**
     * @constructor
     * @param activated_router ActivatedRoute
     * @param router Router
     * @param entityService IEntityDataService
     * @param zone NgZone
     */
    constructor(
        private activated_router: ActivatedRoute,
        private router: Router,
        private entityService: IEntityDataService,
        private zone: NgZone,
        private messageService: MessageService
    ) { }

    /**
     * @ngOnInit
     * @param
     * Show the popup, get parameter from URL and get data when something changed.
     */
    ngOnInit() {
        let operator: string = "";
        this.zone.run(() => { this.entity = null; this.entityType = null; });
        this.entitySub = this.activated_router.params.subscribe(params => {
            // Get entity target type by ID from factory
            this.entityID = params['id'].split('_')[0];
            operator = params['id'].split('_')[1];
            this.setOperator(operator);
            let activated_parent = this.activated_router.parent;
            let entity_compute = activated_parent.snapshot.params['compute'];
            let arr = entity_compute.split('.');
            this.target = arr[1];
            this.source = arr[0].split('_')[1];
            this.module = arr[0].split('_')[0];

            this.entityType = EntityClassProvider.mapEntity.getByID(this.module + "." + this.target);
            this.entitySourceType = EntityClassProvider.mapEntity.getByID(this.module + "." + this.source);
            //this.title = entityInstance.getModuleName() + " " + entityInstance.getEntityName() + " Table";
            //this.subTitle = "Record Detail";

            let that = this;

            //Check models that user could edit or not
            this.entityService.userHasPermission(this.entityType, 'Edit').then(
                (result: boolean) => that.zone.run(() => that.showSubmitBuntton = result),
                error => this.messageService.emitError('Error occurred', error.toString())
            );

            //Get entity by entity type and entity ID and show generic-form
            if (!this.operatorInsert) {
                this.entityService.fetchEntity(this.entityType, this.entityID).then((entity: any) =>
                    that.zone.run(() => {
                        that.entityType = this.entityType;
                        that.entity = entity;
                        EntityChangeService.entityChange.emit(that.entity);
                    }),
                    error => this.messageService.emitError('Error occurred', error.toString())
                );
            }

            if (!this.operatorDelete) {
                if (this.operatorInsert) {
                    that.entityType = this.entityType;
                    that.entity = new this.entityType();
                    EntityChangeService.entityChange.emit(that.entity);
                }

                this.entityService.fetchEntity(this.entitySourceType, this.entityID).then(
                    (entity: any) => that.zone.run(() => {
                        that.entitySourceType = this.entitySourceType;
                        that.entitySource = entity;
                        EntityChangeService.entityChange.emit(that.entitySource);
                    }),
                    error => this.messageService.emitError('Error occurred', error.toString())
                );
            }

            (<any>jQuery(this.modalPopup.nativeElement)).modal('show');
        });
        //When has a emit from EntityChangeService.entiTyIDChange, it will emit a array of entity type based on entiTyIDChange
        //Anywhere subscribe EntityChangeService.entityTypeChange will receive the array of entity type
        let that = this;

        this.entityIDSub = EntityChangeService.entiTyIDChange.subscribe((id: string) =>
            that.zone.run(() => {
                let eType = EntityClassProvider.mapEntity.getByID(id);
                if (this.entityTypeArray.filter(e => e.key === id).length == 0) {
                    this.entityTypeArray.push(new EntityWithType(id, eType));
                }
                EntityChangeService.entityTypeChange.emit(this.entityTypeArray);
            }));

        this.entityIDSourceSub = EntityChangeService.entiTyIDChange.subscribe(
            (id: string) => {
                that.zone.run(() => {
                    let eType = EntityClassProvider.mapEntity.getByID(id);
                    if (this.entitySourceTypeArray.filter(e => e.key === id).length == 0) {
                        this.entitySourceTypeArray.push(new EntityWithType(id, eType));
                        EntityChangeService.entityTypeChange.emit(this.entitySourceTypeArray);
                    }
                })
            }
        );


    }

    /**
    * @onBack
    * @param
    * @Get back to the previous step
    */
    onBack() {
        window.history.back();
    }

    /**
     * @onNotification
     * @param entity IDataStructure
     * @Emit the flag to show notifaction for update data successfull or failed
     */
    onNotification(entity: IDataStructure) {
        this.messageService.emitInfo('Update Success', 'You updated the data with ID: ' + entity.ID);
    }

    /**
     * @ngOnDestroy
     * @param
     * @Hide the popup and unsubcribe
     */
    ngOnDestroy() {
        (<any>jQuery(this.modalPopup.nativeElement)).modal('hide');
        if (this.entitySub) this.entitySub.unsubscribe();
        if (this.entityIDSub) this.entityIDSub.unsubscribe();
    }

    private setOperator(operator: string) {
        switch (operator) {
            case "Insert":
                this.operatorInsert = true;
                break;
            case "Update":
                this.operatorUpdate = true;
                break;
            case "Delete":
                this.operatorDelete = true;
                break;
        }
    }
}