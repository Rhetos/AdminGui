import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from '../components/home.component';
import { ProfilePageComponent } from '../components/profile-page.component';
import { ComputedViewComponent } from '../components/computed-view.component';
import { InvalidViewComponent } from '../components/invalid-view.component';
import { GenericGridComponent } from '../components/generic-grid.component';
import { NullComponent } from '../components/null.component';
import { FormDetailComponent } from '../components/form-detail.component';
import { FormCreateComponent } from '../components/form-create.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'app', pathMatch: 'full'
    },
    { path: 'app', component: HomeComponent },
    { path: 'app/profile-page', component: ProfilePageComponent }
    //{ path: 'computed/:compute', loadChildren: 'scripts/modules/computed.module.ts#ComputedModule' },
    //{ path: 'generic-grid/:claim', loadChildren: 'scripts/modules/generic-view.module.ts#GenericViewModule' },
    //{ path: 'invalid-view', loadChildren: 'scripts/modules/checking-invalid.module.ts#CheckingInvalidViewModule' }
];

export const APP_ROUTES_PROVIDERS: ModuleWithProviders = RouterModule.forRoot(routes);