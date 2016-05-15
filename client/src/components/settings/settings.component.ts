import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';
import {Settings} from "./settings";

@Component({
    templateUrl: Template.getUrl('settings.component.html', 'settings')
})

export class SettingsComponent {
    public settings: Settings;
}
