import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GridPrimeControl } from 'basecode/controls';
import { IButtonInfo, ButtonInfo, FieldFilter, FilterMatchMode, IComposableFilter, IEmptyConstruct, IEntityDataService, ErrorInCommand, ErrorService } from 'basecode/core';
import { EntityClassProvider } from '../models/entity-class.provider';
import { InvalidDataService } from '../services/invalidata.service';
import { MessageService } from '../services/message.service';
//import { Err } from 'basecode/core';

@Component({
    selector: 'grid-claims',
    templateUrl: './templates/components/generic-grid.component.html',
    styleUrls: ['./css/components/generic-grid.component.css']
})
export class GenericGridComponent implements AfterViewInit {

    /** Entity type */
    private entityType: any = null;

    private parentType: any = null;

    /** Link for update entity */
    private claimLink: string = "";

    /** Link for create new entity */
    private claimCreateLink: string = "";

    /** Router subscription */
    private routerSub: any = null;

    private errorSub: any = null;
    /** Name invalid filter is chosen on Invalidfilter-dropdown */
    private nameFilter: string = "";

    /** All invalid filters which entity has */
    private invalidDataFilters: Array<any> = [];

    /** List invalid data in table*/
    private listInvalidData: Array<any> = [];

    /** All filterby and composablefilterby which entity has */
    private availableFilters: Array<any> = [];

    /** Show or hide invalid data list on DOM */
    private hideInvalidData: boolean = false;

    /** Name filter is chosen on filter-dropdown */
    private currentFilterWithParams: string = "";

    /** Entity type of filter */
    private filterType: any = null;

    /** Filter data is used to filter */
    private filterData: any = null;

    /** Show or hide form to enter filter data */
    private filterWithParamsVisible: boolean = false;

    /** InvalidSubcription when Invalidfilter-dropdown changes */
    private observableInvalidSubcription: any = null;

    /** FilterSubcription when filter-dropdown changes */
    private observableFilterSubcription: any = null;

    /** Get Grid-prime component from DOM */
    @ViewChild("gridprime") gridPrime: GridPrimeControl;

    private isError: boolean = false;
    private errorMessage: string = "";

    /**
     * @constructor
     * @param router
     * @param entityService
     * @param zone
     * @param messageService
     */
    constructor(
        private router: ActivatedRoute,
        private entityService: IEntityDataService,
        private zone: NgZone,
        private invalidDataService: InvalidDataService,
        private errorService: ErrorService,
        private messageService: MessageService
    ) { }
    /**
    /**
     * @ngOnInit
     * @param
     * @Get entity type by parse URL, intial claimLinkand and claimCreateLink, get list of invalid filter and others filters
     */
    ngOnInit() {
        this.routerSub = this.router.params.subscribe(params => {

            // Get entity type by ID from factory
            let claim = params['claim'];
            this.entityType = EntityClassProvider.mapEntity.getByID(claim);
            let parentName: string = (new this.entityType()).getParentName();
            if (parentName)
                this.parentType = EntityClassProvider.mapEntity.getByID(parentName);
            this.claimLink = "/generic-grid/" + claim;
            this.entityService.userHasPermission(this.entityType, 'New').then(
                (result: boolean) => {
                    if (result)
                        this.claimCreateLink = "/generic-grid/" + claim + "/add";
                    else
                        this.claimCreateLink = "";
                },
                error => this.messageService.emitError('Error', error.toString())
            );

            // Initial value when router changes

            this.currentFilterWithParams = "";
            this.isError = false;
            this.errorMessage = null;

            if (this.gridPrime) this.gridPrime.itemFilter = null;
            this.filterWithParamsVisible = false;

            // Get invalid data from model
            this.invalidDataFilters = (new this.entityType()).getInvalidDataDefinitions();

            //Get filters from model
            this.availableFilters = (new this.entityType()).getFilterDefinitions();

            this.nameFilter = "";


            if (this.invalidDataService.currentFilter != "") {
                this.nameFilter = this.invalidDataService.currentFilter;
                this.gridPrime.itemFilter = (this.nameFilter != "") ? [{ FilterName: this.nameFilter }] : null;

                this.invalidDataService.currentFilter = "";
            }

            // Auto refresh grid when router change
            setTimeout(() => this.zone.run(() => {
                if (this.gridPrime && !this.isError) this.gridPrime.loadData();
                if (this.isError) {
                    this.messageService.emitError('Error', this.errorMessage);
                } else if (this.gridPrime) {
                    this.gridPrime.loadData();
                }
            }), 100);

        })

        this.errorSub = this.errorService.errorObserver.subscribe((mess: string) => {
            console.log("abc");
            this.isError = true;
            this.errorMessage = mess;
        });
    }

    /**
     * @ngOnDestroy
     * @param
     */
    ngOnDestroy() {
        if (this.routerSub) this.routerSub.unsubscribe();
        if (this.observableFilterSubcription) this.observableFilterSubcription.unsubscribe();
        if (this.observableInvalidSubcription) this.observableInvalidSubcription.unsubscribe();
    }

    /**
     * @invalidOnClick
     * @param
     * @Show a list of invalid data  when user click on button "Check all invalid data"
     */
    invalidOnClick() {
        this.listInvalidData = [];
        this.invalidDataFilters.map(filter => {
            let that = this;
            this.entityService.loadData(this.entityType, [], [{ FilterName: filter.filter }]).then((data: any) => {
                that.zone.run(() => that.listInvalidData.push({ name: filter.filter, value: data.totalCount }));
                if (that.listInvalidData.length > 0) {
                    that.hideInvalidData = true;
                }
            })
            this.entityService.loadData(this.entityType, [], [{ FilterName: filter.filter }]).then(
                (data: any) => {
                    that.zone.run(() => that.listInvalidData.push({ name: filter.filter, value: data.totalCount }));

                    if (that.listInvalidData.length > 0) {
                    }
                }),
                error => this.messageService.emitError('Error', error.toString())
        })
    }

    /**
     * @hideInvalidFiltersOnClick
     * @param
     * @Hide list of invalid data when user click on button "Hide invalid data result"
     */
    hideInvalidFiltersOnClick() {
    }

    /**
     * @searchWithFilter
     * @param filterData
     * @Search value based on parameters of filters
     */
    searchWithFilter(filterData: any) {
        let that = this;
        that.zone.run(() => {
            that.gridPrime.itemFilter = [{ FilterName: that.currentFilterWithParams, FilterData: filterData.data[0] }];
            that.gridPrime.loadData();
        });
    }

    /**
     * @ngAfterViewInit
     * @param
     * @Subscribe when invalidfilter-dropdown and filter-dropdown change
     */
    ngAfterViewInit() {
        let that = this;
        let dropdownFilter = document.getElementById('invalidDataFilter');
        let availableFilterWithParameter = document.getElementById('availableFilters');

        // Filter the grid with invalid data filter when user selects invalid data on dropdown
        this.observableInvalidSubcription = Observable.fromEvent(dropdownFilter, 'change').debounceTime(100).subscribe((_: any) => {
            that.zone.run(() => {
                that.gridPrime.itemFilter = (that.nameFilter != "") ? [{ FilterName: that.nameFilter }] : null;
                that.gridPrime.loadData();
            });
        });

        // Filter the grid with parameters of filters when user asks
        this.observableFilterSubcription = Observable.fromEvent(availableFilterWithParameter, 'change').debounceTime(100).subscribe((_: any) => {
            that.zone.run(() => {
                if (that.currentFilterWithParams && that.currentFilterWithParams != "") {
                    that.filterWithParamsVisible = false;
                    setTimeout(() => that.filterWithParamsVisible = true, 100);
                }
                else {
                    // When user choose "Not selected"
                    that.filterWithParamsVisible = false;
                    that.gridPrime.itemFilter = null;
                    that.gridPrime.loadData();
                }
            });
        });
    }

}