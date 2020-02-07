import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentDashboardTwitchService} from './tournament-dashboard-twitch.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit, OnDestroy {

  public twitchChannels: string[] = [];

  private _subscription = new Subscription();

  constructor(private _tournamentDashboardTwitchService: TournamentDashboardTwitchService) {
  }

  ngOnInit() {
    this._subscription.add(this._tournamentDashboardTwitchService.channels().subscribe(channels => this.twitchChannels = channels));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
