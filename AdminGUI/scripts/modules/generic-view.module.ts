import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

import { GenericFormComponent } from 'basecode/core';
import { GridPrimeControl } from 'basecode/controls';

import { GenericGridComponent } from '../components/generic-grid.component';
import { GENERICVIEW_ROUTES_PROVIDERS } from '../routings/generic-view.routing';
import { NullComponent } from '../components/null.component';
import { FormDetailComponent } from '../components/form-detail.component';
import { FormCreateComponent } from '../components/form-create.component';
import { BaseCodeModule } from './basecode.module';
import { ErrorPageComponent } from '../components/error-page.component';

@NgModule({
    declarations: [GenericGridComponent, NullComponent, FormCreateComponent, FormDetailComponent, ErrorPageComponent],
    imports: [CommonModule, GENERICVIEW_ROUTES_PROVIDERS, BaseCodeModule, FormsModule]
})
export class GenericViewModule { }