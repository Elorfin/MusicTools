import { Component } from '@angular/core';
import { Template } from './../../../library/layout/template.service';
import { Settings } from './../shared/settings';

@Component({
    templateUrl: Template.getUrl('show.component.html', 'settings/show')
})

export class SettingsShowComponent {
    public settings: Settings;
}
