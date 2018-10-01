import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmptyConstruct, IEntityDataService, IDataStructure, NotificationService, GenericFormComponent, EntityChangeService, EntityWithType } from 'basecode/core';
import { EntityClassProvider } from '../models/entity-class.provider';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'create-form',
    templateUrl: './templates/components/form-create.component.html',
})
export class FormCreateComponent {
    /** Type of entity*/
    private entityType: any = null;

    /** Subscription ID Entity Changed*/
    private entityIDSub: any = null;

    /** Array of Type Entity*/
    private entityTypeArray: Array<EntityWithType> = [];

    /** Parameter from URL*/
    public claim: string = "";

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
        private messageService: MessageService) { }

    /**
     * @ngOnInit
     * @param
     * Show the popup, get parameter from URL and get data when something changed.
     */
    ngOnInit() {
        //Get parameter from url
        let activated_parent = this.activated_router.parent;
        this.claim = activated_parent.snapshot.params['claim'];

        //Show generic-form
        this.entityType = EntityClassProvider.mapEntity.getByID(this.claim);
        let entityInstance = new this.entityType();
        this.title = entityInstance.getModuleName() + " " + entityInstance.getEntityName() + " Table";
        this.subTitle = "New Record";

        (<any>jQuery(this.modalPopup.nativeElement)).modal('show');

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
     * @Emit the flag to show notifaction for creating new data successfull or failed
     */
    onNotification(entity: IDataStructure) {
        this.messageService.emitInfo('Create Success', 'You added new data with ID: ' + entity.ID);
    }

    /**
     * @ngOnDestroy
     * @param
     * @Hide the popup and unsubcribe entityIDSub
     */
    ngOnDestroy() {
        (<any>jQuery(this.modalPopup.nativeElement)).modal('hide');
        if (this.entityIDSub) this.entityIDSub.unsubscribe();
    }
}