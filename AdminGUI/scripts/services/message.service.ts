import { Injectable } from '@angular/core';
import {  NotificationService } from 'basecode/core';

@Injectable()
export class MessageService {
    constructor(
        private notificationService: NotificationService
    ) {
    }

    public subcribe(generatorOrNext?: any, error?: any, complete?: any) {
        this.notificationService.emitter.subscribe(generatorOrNext, error, complete);
    }

    public emit(severity: string, summary: string, detail: string) {
        this.notificationService.emitter.emit({ 
            severity: severity, 
            summary: summary, 
            detail: detail 
        });
    }
    
    public emitError(summary: string, detail: string) {
        this.emit('error', summary, detail);
    }

    public emitInfo(summary: string, detail: string) {
        this.emit('info', summary, detail);
    }

    public emitWarn(summary: string, detail: string) {
        this.emit('warn', summary, detail);
    }
}