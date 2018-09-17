/// <reference path="jquery/jquery.d.ts" />
/// <reference path="jqueryui/jqueryui.d.ts" />
// Type definitions for Jquery
interface JQuery {
    adminPluginMultiSelect(): JQuery;
    adminPluginMultiSelect(Opt: any): JQuery;
    nanoScroller(): JQuery;
    nanoScroller(Opt: any): JQuery;
    showMagnificPopup(): JQuery;
    hideMagnificPopup(): JQuery;
    modal(opt?: any): any;

    /**
     * Uing cropit jquery plugin.
     */
    cropit(): any;
    cropit(attributes: any): any;
    cropit(attributes: any, values: any): any;
}
