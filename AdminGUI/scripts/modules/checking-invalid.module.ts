import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";

import { InvalidViewComponent } from '../components/invalid-view.component';
import { HistoryComponent } from '../components/history.component';
import { INVALIDVIEW_ROUTES_PROVIDERS } from '../routings/checking-invalid.routing';
import { BaseCodeModule } from './basecode.module';
import { DataTableModule, TabViewModule } from 'primeng/primeng';

@NgModule({
    declarations: [InvalidViewComponent, HistoryComponent ],
    imports: [CommonModule, INVALIDVIEW_ROUTES_PROVIDERS, BaseCodeModule, FormsModule, DataTableModule, TabViewModule]
})
export class CheckingInvalidModule { }