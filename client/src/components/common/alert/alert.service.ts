import { Injectable } from '@angular/core';
import {Alert} from "./alert";

/**
 * Alert definition
 */
@Injectable()
export class AlertService
{
    public ERROR_TYPE:String   = 'danger';
    public SUCCESS_TYPE:String = 'success';
    public WARNING_TYPE:String = 'warning';
    public INFO_TYPE:String    = 'info';

    /**
     * Display duration for the alert which are configured to be auto-hidden
     * @type {number}
     */
    private displayDuration:Number = 10000;

    /**
     * List of all current active alerts
     * @param alert
     */
    private alerts: Alert[] = [
        /*{
            type: 'success',
            message: 'Entity successfully created !',
            detail: null,
            cancel: function() {

            }
        },
        {
            type: 'danger',
            message: 'Your request is invalid.',
            detail: null,
            cancel: null
        },
        {
            type: 'danger',
            message: 'Ceci est une alerte',
            detail: 'ghergresg drfgr gsreg rsdegres gsdrgr sgsdgsdg',
            cancel: null
        },
        {
            type: 'warning',
            message: 'Ceci est une alerte',
            detail: 'ghergresg drfgr gsreg rsdegres gsdrgr sgsdgsdg',
            cancel: function() {

            }
        },
        {
            type: 'info',
            message: 'Ceci est une alerte',
            detail: 'ghergresg drfgr gsreg rsdegres gsdrgr sgsdgsdg',
            cancel: null
        }*/
    ];

    /**
     * Get active alerts
     * @returns {Array}
     */
    public getAlerts(): Alert[] {
        return this.alerts;
    }

    /**
     * Add a new Alert in the alerts stack
     * @param {Alert} alert
     */
    public add(alert: Alert) {
        this.alerts.push(alert);
    }

    /**
     * Remove an alert from the alerts stack
     * @param {Object}  alert
     * @param {boolean} [clearTimeout]
     */
    public remove(alert: Alert, clearTimeout: Boolean) {
        var pos = this.alerts.indexOf(alert);
        if (-1 !== pos) {
            this.alerts.splice(pos, 1);
        }
    }
}
