import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TwitchDashboardComponent} from './twitch/twitch-dashboard/twitch-dashboard.component';


const routes: Routes = [
  {
    path: 'team-view',
    children: [
      {path: 'twitch', component: TwitchDashboardComponent},
      // empty paths and unknown paths in this sub-tree should redirect to twitch.
      {path: '', redirectTo: '/team-view/twitch', pathMatch: 'full' },
      {path: '**', redirectTo: '/team-view/twitch', pathMatch: 'full'}
    ]
  },
  // empty paths and unknown paths should redirect to /team-view
  {path: '', redirectTo: '/team-view', pathMatch: 'full'},
  {path: '**', redirectTo: '/team-view', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
