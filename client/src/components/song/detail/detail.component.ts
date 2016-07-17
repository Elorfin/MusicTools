import { Component } from '@angular/core';

import { Template }  from './../../../library/layout/template.service';

@Component({
    selector: 'song-detail',
    templateUrl: Template.getUrl('detail.component.html', 'song/detail')
})

export class SongDetailComponent {
    song: Object[];
}
