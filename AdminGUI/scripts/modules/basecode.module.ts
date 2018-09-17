import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent, CheckboxWrapperControl, CheckboxJqueryControl, DatePickerWrapperControl, DatePickerJqueryControl, TextboxWrapperControl, DropdownJqueryControl, DropDownWrapperControl, SuperTextboxJqueryControl, SuperTextboxWrapperControl, DropDownAndLookupWrapperControl, LookupJqueryControl } from 'basecode/controls';
import { LoginComponent, IEntityDataService, RhetosRestService, TestLogger, GlobalDataSharing, CORSBrowserXHr } from 'basecode/core';
import { PermissionProvider, IEntityContainer, ComponentCustomizationFactory, DataCustomizationFactory, LoginService } from 'basecode/core';
import { GridPrimeControl, WrapperPipe } from 'basecode/controls';
import { NotificationService, ActiveMenuItem, GenericFormComponent, BusyOverlayComponent, PlaceholderComponent } from 'basecode/core';
import { Growl, DataTableModule } from 'primeng/primeng';
import { HighlightDirective } from 'controls/directive/background.directive';

@NgModule({
    providers: [
        RhetosRestService, PermissionProvider, ComponentCustomizationFactory, IEntityContainer, DataCustomizationFactory, LoginService,
        ActiveMenuItem, NotificationService,

        { provide: IEntityDataService, useClass: RhetosRestService },
        { provide: TestLogger, useClass: TestLogger },
        { provide: GlobalDataSharing, useClass: GlobalDataSharing },
        { provide: BrowserXhr, useClass: CORSBrowserXHr }     
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTableModule],
    declarations: [MenuComponent, LoginComponent, Growl, GenericFormComponent, GridPrimeControl, BusyOverlayComponent, PlaceholderComponent, WrapperPipe,
        CheckboxWrapperControl, CheckboxJqueryControl, DatePickerWrapperControl, DatePickerJqueryControl, TextboxWrapperControl, DropdownJqueryControl,
        DropDownWrapperControl, HighlightDirective, LookupJqueryControl, SuperTextboxJqueryControl, SuperTextboxWrapperControl, DropDownAndLookupWrapperControl],
    exports: [MenuComponent, LoginComponent, Growl, GenericFormComponent, GridPrimeControl, BusyOverlayComponent, PlaceholderComponent, WrapperPipe],
    entryComponents: [DropDownWrapperControl, TextboxWrapperControl, DatePickerWrapperControl, CheckboxWrapperControl, SuperTextboxWrapperControl,
        DropDownAndLookupWrapperControl, GenericFormComponent]
})
export class BaseCodeModule { }