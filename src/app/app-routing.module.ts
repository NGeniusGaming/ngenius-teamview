import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeamViewDashboard} from './team-view/team-view-dashboard.component';
import {TournamentDashboardComponent} from './tournament/tournament-dashboard/tournament-dashboard.component';

const home = '/team-view/twitch';

const routes: Routes = [
  {
    path: 'team-view',
    children: [
      {path: 'twitch', component: TeamViewDashboard},
      {path: 'tournament', component: TournamentDashboardComponent},
      // empty paths and unknown paths in this sub-tree should redirect to home.
      {path: '', redirectTo: home, pathMatch: 'full' },
      {path: '**', redirectTo: home, pathMatch: 'full'}
    ]
  },
  // empty paths and unknown paths should redirect to home
  {path: '', redirectTo: home, pathMatch: 'full'},
  {path: '**', redirectTo: home, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
