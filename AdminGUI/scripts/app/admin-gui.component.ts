import { Component, AfterViewInit, NgZone, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { MenuComponent } from 'basecode/controls';
import { ActiveMenuItem, AppSettings, AppSettingsDefault, IEmptyConstruct, AppMenuItem, LoginService, LoginInfo, TestLogger  } from 'basecode/core';
import { Message } from 'primeng/primeng';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { AllModels, AllMenuItemModels } from '../models/rhetos.angular2';
import { MessageService } from '../services/message.service';

declare var jQuery: JQueryStatic;

@Component({
    selector: "admin-gui",
    templateUrl: './templates/app/admin-gui.component.html',
    styles: [`
        h1 { color:red; font-size:400%;}
    `
    ],
})
@AppSettingsDefault({
    apiEndpoint: location.origin + (location.pathname.split('/').splice(0, location.pathname.split('/').length - 3).join('/')) + '/REST/',
    loginEndpoint: location.origin + (location.pathname.split('/').splice(0, location.pathname.split('/').length - 3).join('/')) + '/Resources/AspNetFormsAuth/Authentication',
    pingEndpointUrl: location.origin + (location.pathname.split('/').splice(0, location.pathname.split('/').length - 3).join('/')) + '/REST/' + '/common/claim'
})
@AppMenuItem(
    {
            Name: "Setting",
            Link: "",
            Icon: "fa fa-cog",
            Tooltip: "",
            Children: [{
                Name: "CheckInvalid",
                Link: "invalid-view",
                Icon: "fa fa-cog",
                Parent:"Setting",
                Tooltip: "",
                Children: [],
                ClaimRight: "Read",
                ClaimResource: "Common.Claim"
            }]
})
export class AdminGuiComponent implements AfterViewInit {
    private _homePage = "Home";
    private _rootRoute = "app";
    private _loginInfo_: LoginInfo = new LoginInfo();
    private msgs: Message[] = [];

    @ViewChild(MenuComponent) menuComponent: MenuComponent;

    constructor(
        private logger: TestLogger,
        private zone: NgZone,
        private loginService: LoginService,
        private allModels: AllModels,
        private allMenuItem: AllMenuItemModels,
        private activeMenuItem: ActiveMenuItem,
        private router: Router,
        private messageService: MessageService
    ) {    
        var that = this;
        loginService.UserLoginInfoObservable.subscribe((info: LoginInfo) => {
            zone.run(() => {
                that._loginInfo_ = info;
            });
        });
        this._loginInfo_.UserLoggedIn = loginService.userLoggedIn;
        this._loginInfo_.LoggedAs = loginService.loggedAs;
        if (!this.activeMenuItem.SelectedItem) {

            this.activeMenuItem.Crumbs = [this._homePage];
            this.activeMenuItem.SelectedItem = { Name: this._homePage, Link: "/", Icon: "", Tooltip: "", Children: [] };
        }

        DomHandler.zindex = 10000;
    }

    home() {
        this.router.navigate([this._rootRoute]);

        jQuery(".nano li").removeClass("nav-active");
        jQuery("li.home").addClass("nav-active");
    }

    ngAfterViewInit() {
        jQuery('#global-loader-icon').removeClass('spinning-cog').remove();
        jQuery('#global-loader-background').delay(800).fadeOut();
        jQuery('#loader').removeClass('overlay-loader');
        
        this.logger.log("Application initialized!");

        let that = this;
        this.loginService.UserLoginInfoObservable.subscribe((loginInfo: LoginInfo) => {
            that.zone.run(() => {
                that.msgs.push({ severity: 'info', summary: 'Login info', detail: 'Currently logged in as: ' + loginInfo.LoggedAs });
            });
        });

        this.menuComponent.sortMenuItem();
        this.messageService.subcribe((next: Message) => that.zone.run(() => that.msgs.push(next)));
    }
}
