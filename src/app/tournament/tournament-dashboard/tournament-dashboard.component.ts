import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentDashboardTwitchService} from './tournament-dashboard-twitch.service';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {TwitchAggregate} from '../../twitch/api/twitch-aggregate-response.model';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit, OnDestroy {

  public twitchChannels: string[] = [];

  public twitchAggregation: TwitchAggregate[] = [];

  public rows = 1;
  public columns = 1;

  private _subscription = new Subscription();
  private _breakpoint$: Observable<BreakpointState>;

  constructor(private _tournamentDashboardTwitchService: TournamentDashboardTwitchService,
              private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this._breakpoint$ = this._breakpointObserver.observe(Breakpoints.Handset);

    this._subscription.add(
      this._tournamentDashboardTwitchService.twitchAggregation().subscribe(value => this.twitchAggregation = value)
    );
    // TODO: delete.
    this._subscription.add(this._tournamentDashboardTwitchService.twitchAggregation().subscribe(channels => this.twitchChannels = channels.map(v => v.user.display_name)));

    this._subscription.add(this._breakpoint$.subscribe(breakpoint => {
      // if it matches, we have a handset, else, a bigger screen
      if (breakpoint.matches) {
        [this.rows, this.columns] = [1, 2];
      } else {
        [this.rows, this.columns] = [1, 1];
      }
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
