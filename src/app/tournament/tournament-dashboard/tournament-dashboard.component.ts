import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentDashboardTwitchService} from './tournament-dashboard-twitch.service';
import {Subscription} from 'rxjs';
import {TournamentDashboardMixerService} from './tournament-dashboard-mixer.service';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit, OnDestroy {

  public twitchChannels: string[] = [];
  public mixerChannels: string[] = [];

  private _subscription = new Subscription();

  constructor(private _tournamentDashboardTwitchService: TournamentDashboardTwitchService,
              private _tournamentDashboardMixerService: TournamentDashboardMixerService) {
  }

  ngOnInit() {
    this._subscription.add(this._tournamentDashboardTwitchService.channels().subscribe(channels => this.twitchChannels = channels));
    this._subscription.add(this._tournamentDashboardMixerService.channels().subscribe(channels => this.mixerChannels = channels));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
