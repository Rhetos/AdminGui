import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";

import { InvalidViewComponent } from '../components/invalid-view.component';
const routes: Routes = [
    { path: 'invalid-view', component: InvalidViewComponent}
];
export const INVALIDVIEW_ROUTES_PROVIDERS: ModuleWithProviders = RouterModule.forChild(routes);