import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from './users/user/user.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {HomeComponent} from './home/home.component';
import {ServerComponent} from './servers/server/server.component';
import {ServersComponent} from './servers/servers.component';
import {UsersComponent} from './users/users.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from './auth-guard.service';
import {CanDeactivateGuradService} from './servers/edit-server/can-deactivate-gurad.service';
import {ServerResolveService} from './servers/server/server-resolve.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent,
    children: [
      {path: ':id/:name', component: UserComponent},
    ]
  },
  {path: 'servers',
    /* canActivate: [AuthGuardService]*/
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent, resolve : {server : ServerResolveService}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuradService]}
    ]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo : '/not-found'},
];


@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


