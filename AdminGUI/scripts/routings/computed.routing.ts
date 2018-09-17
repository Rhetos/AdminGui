import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { ComputedViewComponent } from '../components/computed-view.component';
import { DiffViewComponent } from '../components/diff-view.component';
import { NullComponent } from '../components/null.component';
const routes: Routes = [
    {
        path: 'computed/:compute', component: ComputedViewComponent, children: [
            { path: '', component: NullComponent },
            { path: ':id', component: DiffViewComponent }
        ]
    }
];
export const COMPUTED_ROUTES_PROVIDERS: ModuleWithProviders = RouterModule.forChild(routes);