/// <reference path="jquery/jquery.d.ts" />
// Type definitions for CurrentTheme
declare interface CurrentThemeInterface {

    navigationInit(jQuery: JQueryStatic): void;
    skeletonInit(jQuery: JQueryStatic): void;
    bootstrapToggle(jQuery: JQueryStatic): void;
    tooltipInit(jQuery: JQueryStatic): void;
    datepickerInit(jQuery: JQueryStatic): void;
}
interface Array<T> {

    equals(array: T[]): boolean;
    remove(t: T): this;
}

declare var CurrentTheme: CurrentThemeInterface;