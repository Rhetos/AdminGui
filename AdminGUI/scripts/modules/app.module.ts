import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic  } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule } from '@angular/http';

import { AdminGuiComponent } from '../app/admin-gui.component';
import { APP_ROUTES_PROVIDERS } from '../routings/app.routing';
import { HeaderAdminGuiAppComponent } from '../controls/header-admingui.control';
import { AllModels, AllMenuItemModels } from '../models/rhetos.angular2';
import { InvalidDataService } from '../services/invalidata.service';
import { BaseCodeModule } from './basecode.module';
import { HomeComponent } from '../components/home.component';
import { ProfilePageComponent } from '../components/profile-page.component';
import { CheckingInvalidModule } from './checking-invalid.module';
import { GenericViewModule } from './generic-view.module';
import { Growl, DataTableModule } from 'primeng/primeng';
import { ComputedModule } from './computed.module';
import { ErrorService } from 'basecode/core';

@NgModule({
    providers: [
        InvalidDataService, AllModels, AllMenuItemModels, 

        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ErrorService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AdminGuiComponent, HeaderAdminGuiAppComponent, HomeComponent, ProfilePageComponent ],
    imports: [APP_ROUTES_PROVIDERS, BrowserModule, BaseCodeModule, HttpModule, CheckingInvalidModule, ComputedModule, GenericViewModule],
    bootstrap: [ AdminGuiComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);


