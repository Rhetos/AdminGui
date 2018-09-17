import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Output, ViewChild, AfterViewInit, EventEmitter, ViewContainerRef, ElementRef, Injector, Injectable, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserXhr } from '@angular/http';
import { AppSettings, AppSettingsDefault } from 'basecode/core';
import { FormBuilder } from '@angular/forms'
import { LoginService } from 'services/index';
import { LoginInfo } from 'models/index';

@Component({
    selector: 'header-admingui',
    templateUrl: `templates/controls/header-admingui.control.html`
})

export class HeaderAdminGuiAppComponent {

    /** Infomation of login account */
    private loginInfo: LoginInfo = new LoginInfo();

    /**
     * @constructor
     * @param fb FormBuilder
     * @param currentZone NgZone
     * @param loginService LoginService
     * @param router Router
     */
    constructor(private fb: FormBuilder, private currentZone: NgZone, private loginService: LoginService, private router: Router) {
        var that = this;
        loginService.UserLoginInfoObservable.subscribe((info: LoginInfo) => {
            that.currentZone.run(() => {
                that.loginInfo = info;
            });
        });
        that.loginInfo.LoggedAs = loginService.loggedAs;
        that.loginInfo.UserLoggedIn = loginService.userLoggedIn;
    }
    /**
     * navigate to Profile Page
     * @param 
     */
    navigateProfilePage() {
        this.router.navigateByUrl("/app/profile-page");
    }

    /**
     * Log Out
     * @param 
     */
    logOut() {
        var isLogOut = confirm("Are you sure you want to logout?");
        if (isLogOut) {
            this.loginService.logout();
            window.location.href = location.origin + (location.pathname.split('/').splice(0, location.pathname.split('/').length - 3).join('/')) + '/Resources/AspNetFormsAuth/Login.html?ReturnUrl=%2f';

        }
    }

}