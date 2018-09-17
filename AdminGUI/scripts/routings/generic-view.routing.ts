import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { GenericGridComponent } from '../components/generic-grid.component';
import { NullComponent } from '../components/null.component';
import { FormDetailComponent } from '../components/form-detail.component';
import { FormCreateComponent } from '../components/form-create.component';

const routes: Routes = [
    {
        path: 'generic-grid/:claim', component: GenericGridComponent, children: [
            { path: '', component: NullComponent },
            { path: 'add', component: FormCreateComponent },
            { path: ':id', component: FormDetailComponent }
        ]
    }
];

export const GENERICVIEW_ROUTES_PROVIDERS: ModuleWithProviders = RouterModule.forChild(routes);