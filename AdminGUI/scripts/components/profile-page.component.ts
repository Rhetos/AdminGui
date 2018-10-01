import { Component } from '@angular/core';
import { IEntityDataService, EntityWithTotalCount, ActiveMenuItem } from 'basecode/core';
import { CommonGetUserInfo } from '../models/rhetos.angular2';
import { MessageService } from '../services/message.service';
 
@Component({
    selector: 'profile-page',
    templateUrl: './templates/components/profile-page.component.html',
    styles: [`
        tab { padding-left: 4em; }
    `]
})
export class ProfilePageComponent {
    private userName: string = "";
    private roleName: Array<string> = [];
    constructor(
        private entityService: IEntityDataService,
        private activeMenuItem: ActiveMenuItem,
        private messageService: MessageService)
    {
        //Get current user's name and all roles that user has
        this.entityService.loadData(CommonGetUserInfo, [], [{ FilterName: "Common.CurrentUser" }]).then(
            (userData: any) => {
                this.userName = userData.records[0].UserName + "\r\n";

                for (var i = 0; i < userData.totalCount; i++) {
                    this.roleName.push(userData.records[i].HasRole);
                }
            },
            error => this.messageService.emitError('Error occurred', error.toString())
        );

        activeMenuItem.Crumbs = [];
        activeMenuItem.SelectedItem = { Name: "Profile Page", Tooltip: "", Link: "", Children: [] };
    }
}