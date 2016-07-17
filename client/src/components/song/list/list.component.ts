import { Component } from '@angular/core';

import { Template } from './../../../library/layout/template.service';

@Component({
    selector: 'song-list',
    templateUrl: Template.getUrl('list.component.html', 'song/list')
})

export class SongListComponent {
    songs: Object[];
}
