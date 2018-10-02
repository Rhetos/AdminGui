import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmptyConstruct, IEntityDataService, IDataStructure, GenericFormComponent, EntityChangeService, EntityWithType } from 'basecode/core';
import { EntityClassProvider } from '../models/entity-class.provider';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'claim-form',
    templateUrl: './templates/components/form-detail.component.html'
})
export class FormDetailComponent {
    /** Type of entity*/
    private entityType: any = null;


    private entityID: any = null;
    private entity: any = null;
    private entitySub: any = null;

    /** Subscription ID Entity Changed*/
    private entityIDSub: any = null;

    /** Array of Type Entity*/
    public entityTypeArray: Array<EntityWithType> = [];

    /** Parameter from URL*/
    public claim: string = "";

    /** Show or hide Update button */
    public showSubmitBuntton: boolean = true;

    private title: string = "";
    private subTitle: string = "";
    
    /** Get form popup from DOM */
    @ViewChild("lookupPopupModal") modalPopup: ElementRef;

    /**
     * @constructor
     * @param activated_router ActivatedRoute
     * @param router Router
     * @param entityService IEntityDataService
     * @param zone NgZone
     * @param messageService MessageService
     */
    constructor(
        private activated_router: ActivatedRoute,
        private router: Router,
        private entityService: IEntityDataService,
        private zone: NgZone,
        private messageService: MessageService
    ) {
    }

    /**
     * @ngOnInit
     * @param
     * Show the popup, get parameter from URL and get data when something changed.
     */
    ngOnInit() {
        this.zone.run(() => { this.entity = null; this.entityType = null; });

        this.entitySub = this.activated_router.params.subscribe(params => {

            // Get entity type by ID from factory
            this.entityID = params['id'];
            let activated_parent = this.activated_router.parent;
            this.claim = activated_parent.snapshot.params['claim'];

            this.entityType = EntityClassProvider.mapEntity.getByID(this.claim);
            let entityInstance = new this.entityType();
            this.title = entityInstance.getModuleName() + " " + entityInstance.getEntityName() + " Table";
            this.subTitle = "Record Detail";

            let that = this;

            //Check models that user could edit or not
            this.entityService.userHasPermission(this.entityType, 'Edit').then(
                (result: boolean) => that.zone.run(() => that.showSubmitBuntton = result),
                error => this.messageService.emitError('Error', error.toString())
            );

            //Get entity by entity type and entity ID and show generic-form
            this.entityService.fetchEntity(this.entityType, this.entityID).then(
                (entity: any) => that.zone.run(() => {
                    that.entityType = this.entityType;
                    that.entity = entity;
                    (<any>jQuery(this.modalPopup.nativeElement)).modal('show');
                    EntityChangeService.entityChange.emit(that.entity);
                }),
                error => this.messageService.emitError('Error', error.toString())
            );
        });

        //When has a emit from EntityChangeService.entiTyIDChange, it will emit a array of entity type based on entiTyIDChange
        //Anywhere subscribe EntityChangeService.entityTypeChange will receive the array of entity type
        let that = this;
        this.entityIDSub = EntityChangeService.entiTyIDChange.subscribe((id: string) =>
            that.zone.run(() => {
                let eType = EntityClassProvider.mapEntity.getByID(id);
                if (this.entityTypeArray.filter(e => e.key === id).length == 0) {
                    this.entityTypeArray.push(new EntityWithType(id, eType));
                    EntityChangeService.entityTypeChange.emit(this.entityTypeArray);
                }

            }));


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
}