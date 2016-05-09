import {Component}                                      from '@angular/core';
import {Routes, ROUTER_DIRECTIVES}                      from '@angular/router';
import {HeaderComponent, MenuComponent, AlertComponent} from './common/common';

import {Template} from '../library/layout/template.service';

import {DashboardComponent}      from './dashboard/dashboard.component';
import {InstrumentListComponent} from './instrument/list.component';
import {SongListComponent}       from './song/list.component';
import {TheorySummaryComponent}  from './theory/summary.component';
import {LessonListComponent}     from './lesson/list.component';
import {GameListComponent}       from './game/list.component';
import {UserListComponent}       from './user/list.component';

@Routes([
    // Dashboard (default route)
    { path: '/dashboard',   component: DashboardComponent },

    // Libraries
    { path: '/instruments', component: InstrumentListComponent },
    { path: '/songs',       component: SongListComponent },

    // Theory
    { path: '/theory',      component: TheorySummaryComponent },
    { path: '/lessons',     component: LessonListComponent },
    { path: '/games',       component: GameListComponent },

    // Community
    { path: '/users',       component: UserListComponent }
])

@Component({
    selector  :  'music-tools',
    templateUrl: Template.getUrl('app.component.html'),
    directives:  [ROUTER_DIRECTIVES, HeaderComponent, MenuComponent, AlertComponent]
})

export class AppComponent {

}