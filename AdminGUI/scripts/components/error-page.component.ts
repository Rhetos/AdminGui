﻿import { Component, Input } from '@angular/core';
import { ErrorInCommand } from 'basecode/core';

@Component({
    selector:'error-page',
    templateUrl: './templates/components/error-page.component.html'
})
export class ErrorPageComponent {
    @Input() errorMessage: string = "";
}