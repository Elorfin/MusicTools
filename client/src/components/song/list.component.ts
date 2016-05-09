import {Component} from '@angular/core';
import {Template} from '../../library/layout/template.service';

@Component({
    templateUrl: Template.getUrl('list.component.html', 'song')
})

export class SongListComponent {
    songs: Object[];
}
