import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HeaderComponent, MenuComponent} from './common/common';

@RouteConfig([
    /*{path:'/crisis-center', name: 'CrisisCenter', component: CrisisListComponent},
     {path:'/heroes',        name: 'Heroes',       component: HeroListComponent},
     {path:'/hero/:id',      name: 'HeroDetail',   component: HeroDetailComponent}*/
])

@Component({
    selector  : 'music-tools',
    template  : require('./app.component.html'),
    directives: [ROUTER_DIRECTIVES, HeaderComponent, MenuComponent],
    providers : [ROUTER_PROVIDERS]
})

export class AppComponent {

}