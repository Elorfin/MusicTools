import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent }            from "./user/login/login.component";
import { DashboardComponent }        from './dashboard/dashboard.component';
import { InstrumentListComponent }   from './instrument/list/list.component';
import { InstrumentDetailComponent } from './instrument/detail/detail.component';
import { SongListComponent }         from './song/list/list.component';
import { TheorySummaryComponent }    from './theory/summary/summary.component';
import { LessonListComponent }       from './lesson/list/list.component';
import { GameListComponent }         from './game/list/list.component';
import { UserListComponent }         from './user/list/list.component';
import { MessageListComponent }      from './message/list/list.component';
import { UserProfileComponent }      from './user/profile/profile.component';
import { SettingsShowComponent }     from './settings/show/show.component';

export const routes: RouterConfig = [
    // Dashboard (default route)
    { path: '',                component: DashboardComponent },

    // Login
    { path: 'login',           component: LoginComponent },

    // Libraries
    { path: 'instruments/:id', component: InstrumentDetailComponent },
    { path: 'instruments',     component: InstrumentListComponent },
    { path: 'songs',           component: SongListComponent },

    // Theory
    { path: 'theory',          component: TheorySummaryComponent },
    { path: 'lessons',         component: LessonListComponent },
    { path: 'games',           component: GameListComponent },

    // Community
    { path: 'users',           component: UserListComponent },
    { path: 'messages',        component: MessageListComponent },
    { path: 'profile',         component: UserProfileComponent },

    // Settings
    { path: 'settings',        component: SettingsShowComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];