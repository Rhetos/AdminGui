﻿import { Component, ChangeDetectorRef, ChangeDetectionStrategy, Output, ViewChild, AfterViewInit, EventEmitter, ViewContainerRef, ElementRef, Injector, Injectable, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserXhr } from '@angular/http';
import { AppSettings, AppSettingsDefault, LoginService, LoginInfo } from 'basecode/core';
import { FormBuilder } from '@angular/forms';

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
}