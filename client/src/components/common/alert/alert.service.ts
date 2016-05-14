import { Injectable } from '@angular/core';
import {Alert} from "./alert";

/**
 * Alert definition
 */
@Injectable()
export class AlertService
{
    private alerts: Alert[] = [
        {
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
        }
    ];

    public getAlerts(): Alert[] {
        return this.alerts;
    }

    public add() {

    }

    public remove() {

    }
}
