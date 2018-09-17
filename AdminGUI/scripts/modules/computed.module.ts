import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";

import { ReComputeComponent } from '../components/recompute.component';
import { DiffComponent } from '../components/diff.component';
import { DiffGridComponent } from '../components/diff-grid.component';
import { ComputedViewComponent } from '../components/computed-view.component';
import { COMPUTED_ROUTES_PROVIDERS } from '../routings/computed.routing';
import { BaseCodeModule } from './basecode.module';

import { DiffViewComponent } from '../components/diff-view.component';

@NgModule({
    declarations: [ReComputeComponent, DiffComponent, DiffGridComponent, ComputedViewComponent, DiffViewComponent],
    imports: [CommonModule, COMPUTED_ROUTES_PROVIDERS, BaseCodeModule, FormsModule]
})
export class ComputedModule { }