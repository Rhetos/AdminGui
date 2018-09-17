import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { GenericFormComponent } from 'components/generic-form.component';
import { BusyOverlayComponent } from 'components/busy-overlay.component';

import { EntityClassProvider } from '../models/entity-class.provider';
import { ReComputeComponent } from './recompute.component.ts';
import { DiffComponent } from './diff.component.ts';
import { DiffGridComponent } from './diff-grid.component.ts';


@Component({
    selector: 'computed-view',
    templateUrl: './templates/components/computed-view.component.html'
})

export class ComputedViewComponent {
    /** Router subscription */
    private routerSub: any = null;

    /** Name filter is chosen on filter-dropdown */
    private nameFilter: string = "";

    /** Entity type of filter */
    private filterType: any = null;

    /** Filter data is used to filter */
    private filterData: any = null;

    /** All filters which entity has */
    private arrayDataFilters: Array<any> = [];

    /** Name target entity */
    private target: string = "";

    /** Name source entity */
    private source: string = "";

    /** Name source and target's module */ 
    private module: string = "";

    /** Create or delete RecomputeComponent on DOM */
    private refreshRecompute: boolean = true;

    /** Create or delete DiffComponent on DOM */
    private refreshDiff: boolean = true;

    /** Number of record is shown for Insert, Update, Delete */
    private numRecord: number = 10;

    /** Json data is taken from server */
    private jsonData: any = null;

    /** Link of busy picture*/
    private srclink: string = "./css/cog11.svg";

    /** Show or hide busy picture */
    private busy: boolean = false;

    /** Get diff popup component from DOM */
    @ViewChild("diffPopupModal") diffPopupModal: ElementRef;

    /** Get recompute popup component from DOM */
    @ViewChild("reComputePopupModal") reComputePopupModal: ElementRef;

    /** Get recompute component from DOM */
    @ViewChild("reCompute") reCompute: ReComputeComponent;

    /** Get diff component from DOM */
    @ViewChild("diff") diff: DiffComponent;

    /** Get diff grid component from DOM */
    @ViewChild("diffgrid") diffgrid: DiffGridComponent;

    /**
     * @constructor
     * @param router ActivatedRoute
     * @param zone NgZone
     * @param http Http
     */
    constructor(
        private router: ActivatedRoute,
        private zone: NgZone,
        private http: Http) {}

    /**
     * @OnInit
     * @param
     * @Get name and type of target and source, get name module, initial arrayDataFilters and jsonData
     */
    ngOnInit() {
        this.routerSub = this.router.params.subscribe(params => {
            let entity_compute = params['compute'];
            let arr = entity_compute.split('.');
            this.target = arr[1];
            this.source = arr[0].split('_')[1];
            this.module = arr[0].split('_')[0];

            let sourceType = EntityClassProvider.mapEntity.getByID(this.module + '.' + this.source);
            let targetType = EntityClassProvider.mapEntity.getByID(this.module + '.' + this.target);

            let sourceFilter = new sourceType().getFilterDefinitions();
            let targetFilter = new targetType().getFilterDefinitions();

            this.arrayDataFilters = targetFilter.filter((t: any) => sourceFilter.filter((s: any) => s.filter === t.filter).length > 0);

            this.nameFilter = "";
            this.jsonData = null;

        })
    }

    /**
     * @OnDestroy
     * @param 
     */
    ngOnDestroy() {
        if (this.routerSub) this.routerSub.unsubscribe();
    }

    /**
     * @btnDiff_Click
     * @param
     * @When click on Diff button, if there isn't filter is chosen, it will invoke Diff function of Diff component
     * else show Diff popup
     */
    btnDiff_Click() {
        if (this.nameFilter && this.nameFilter !== "")
            (<any>jQuery(this.diffPopupModal.nativeElement)).modal('show');
        else {
            this.diff.onDiff(this.filterData);
        }
    }

    /**
     * @btnDiff_Click
     * @param
     * @When click on Diff button, if there isn't filter is chosen, it will invoke Recompute function of Diff component else show Recompute popup
     */
    btnReCompute_Click() {
        if (this.nameFilter && this.nameFilter !== "")
            (<any>jQuery(this.reComputePopupModal.nativeElement)).modal('show');
        else {
            this.reCompute.onReCompute(this.filterData);
        }

    }

    /**
     * @onDiff
     * @param jsonData
     * @Get json data and reload diffgrid component when recieved diffEvent event from diff component
     */
    onDiff(jsonData: any) {
        if (this.nameFilter && this.nameFilter !== "")
            this.onDiffBack();
        this.jsonData = jsonData;

        let that = this;
        setTimeout(() => that.zone.run(() => { that.diffgrid.loadData(); }), 100);
        
    }

    /**
     * @onDiffBack
     * @param
     * @Refresh Diff component
     */
    onDiffBack() {
        this.refreshDiff = false;
        setTimeout(() => {
            this.refreshDiff = true;
        }, 100);
    }

    /**
     * @onReComputeBack
     * @param
     * @Refresh Recompute component
     */
    onReComputeBack() {
        this.stateBusy(false);
        this.refreshRecompute = false;
        setTimeout(() => {
            this.refreshRecompute = true;
        }, 100);
    }

    /**
     * @onFilterChange
     * @param
     * @Get filter type when user choose another filter on filter dropdown
     */
    onFilterChange() {
        this.refreshDiff = false;
        this.refreshRecompute = false;
        setTimeout(() => {
            if (this.nameFilter && this.nameFilter != "")
                this.filterType = EntityClassProvider.mapEntity.getByID(this.nameFilter);
            this.refreshDiff = true;
            this.refreshRecompute = true;
        }, 100);
    }

    /**
     * @stateBusy
     * @param state boolean
     * @Change busy-overlay state
    */
    stateBusy(state: boolean) {
        this.busy = state;
    }

    /**
     * @hideDiffPopup
     * @Hide Diff popup when received hideDiffPopup event from Diff Component
     */
    hideDiffPopup() {
        (<any>jQuery(this.diffPopupModal.nativeElement)).modal('hide');
        this.stateBusy(true);
    }

    /**
     * @hideRecomputePopup
     * @Hide Recompute popup when received hideRecomputePopup event from Diff Component
     */
    hideRecomputePopup() {
        (<any>jQuery(this.reComputePopupModal.nativeElement)).modal('hide');
        this.stateBusy(true);
    }
}