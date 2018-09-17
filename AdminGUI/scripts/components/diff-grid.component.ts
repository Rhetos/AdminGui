import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
    selector: 'diff-grid',
    //directives: [ROUTER_DIRECTIVES],
    templateUrl: './templates/components/diff-grid.component.html',
    styleUrls: ['./css/components/diff-grid.component.css']
})
export class DiffGridComponent{
    /** Jason Data string*/
    @Input() jsonData: any = null;
    /** Name Moduel */
    @Input() module: string = "";
    /** Name Source*/
    @Input() source: string = "";
    /** Name Target*/
    @Input() target: string = "";

    /** Array Data shown on grid*/
    private dataArray: Array<any> = [];

    /** Numerical Order*/
    private count: number = 1;

    /** Number of Insert Row*/
    private insertCount: number = 0;

    /** Number of Update Row*/
    private updateCount: number = 0;

    /** Number of Delete Row*/
    private deleteCount: number = 0;

    constructor(private router: Router) { }
    /**
     * @loadData
     * @param 
     * @Get data from string json and show it on grid
     */
    public loadData() {
        this.count = 1;
        this.dataArray = [];

        let diffInsert = this.jsonData.toInsertRecords;
        let diffUpdate = this.jsonData.toUpdateRecords;
        let diffDelete = this.jsonData.toDeleteRecords;

        this.insertCount = this.jsonData.toInsertCount;
        this.updateCount = this.jsonData.toUpdateCount;
        this.deleteCount = this.jsonData.toDeleteCount;

        diffInsert.map((x: any) => { this.dataArray.push({ RowNumber: this.count++, Description: JSON.stringify(x), Indication: 'Insert' }); })
        diffUpdate.map((x: any) => { this.dataArray.push({ RowNumber: this.count++, Description: JSON.stringify(x), Indication: 'Update' }); })
        diffDelete.map((x: any) => { this.dataArray.push({ RowNumber: this.count++, Description: JSON.stringify(x), Indication: 'Delete' }); })
    }

    private changeToDiffView(item: any) {
        let link: string = "computed/" + this.module + "_" + this.source + "." + this.target;
        let json: any = JSON.parse(item.Description);
        //if (item.Indication  == "Update")
        this.router.navigate([link, json.ID + "_" + item.Indication]);
    }
}