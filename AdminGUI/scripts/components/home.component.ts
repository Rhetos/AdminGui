import { BrowserXhr } from '@angular/http';
import { NgZone, Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActiveMenuItem } from 'basecode/core';

@Component({
    selector: 'home',
    templateUrl: './templates/components/home.component.html'
})
export class HomeComponent {

    constructor(
        private fb: FormBuilder,
        private _currentZone: NgZone,
        private activeMenuItem: ActiveMenuItem)
    {
        activeMenuItem.Crumbs = [];
        activeMenuItem.SelectedItem = { Name: "Home", Tooltip: "", Link: "", Children: [] };
    }
}