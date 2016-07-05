import {Component, OnInit}                              from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES}              from '@angular/router';
import {HeaderComponent, MenuComponent, AlertComponent} from './common/common';

import {Template} from '../library/layout/template.service';

import {DashboardComponent}        from './dashboard/dashboard.component';
import {InstrumentListComponent}   from './instrument/list.component';
import {InstrumentDetailComponent} from './instrument/detail.component';
import {SongListComponent}         from './song/list.component';
import {TheorySummaryComponent}    from './theory/summary.component';
import {LessonListComponent}       from './lesson/list.component';
import {GameListComponent}         from './game/list.component';

import {InstrumentService}   from './instrument/instrument.service';

// Community
import {UserListComponent}       from './user/list.component';
import {MessageListComponent}    from './message/list.component';
import {UserProfileComponent}    from './user/profile.component';

// Settings
import {SettingsComponent}       from './settings/settings.component';
import {ApiService} from "../library/api/api-service";

@Routes([
    // Dashboard (default route)
    { path: '/dashboard',       component: DashboardComponent },

    // Libraries
    { path: '/instruments/:id', component: InstrumentDetailComponent },
    { path: '/instruments',     component: InstrumentListComponent },
    { path: '/songs',           component: SongListComponent },

    // Theory
    { path: '/theory',          component: TheorySummaryComponent },
    { path: '/lessons',         component: LessonListComponent },
    { path: '/games',           component: GameListComponent },

    // Community
    { path: '/users',           component: UserListComponent },
    { path: '/messages',        component: MessageListComponent },
    { path: '/profile',         component: UserProfileComponent },

    // Settings
    { path: '/settings',        component: SettingsComponent }
])

@Component({
    selector  :  'music-tools',
    templateUrl: Template.getUrl('app.component.html'),
    directives:  [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        MenuComponent,
        AlertComponent
    ],
    providers:  [
        ApiService,
        InstrumentService
    ]
})

export class AppComponent implements OnInit {
    public pushContent: Boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {
        // Open the default route
        this.router.navigate(['/dashboard']);
    }
}
