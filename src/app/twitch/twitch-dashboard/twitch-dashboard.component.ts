import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../../config/configuration.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Configuration} from '../../config/configuration.model';

interface TwitchCardMeasurements {
  readonly channel: string;
  readonly cols: 1 | 2 | 3;
  readonly rows: 1 | 2;
}

@Component({
  selector: 'app-twitch-dashboard',
  templateUrl: './twitch-dashboard.component.html',
  styleUrls: ['./twitch-dashboard.component.scss']
})
export class TwitchDashboardComponent implements OnInit, OnDestroy {

  public channels: string[];
  public sizedChannels: TwitchCardMeasurements[];

  private _subscription = new Subscription();

  private configuration$: Observable<Configuration>;
  private breakpoint$: Observable<BreakpointState>;

  constructor(private _configurationService: ConfigurationService, private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.configuration$ = this._configurationService.configuration();
    this.breakpoint$ = this._breakpointObserver.observe(Breakpoints.Handset);

    this._subscription.add(
      this.configuration$
        .subscribe(value => this.channels = value.twitch.channels)
    );

    this._subscription.add(
      combineLatest([this.configuration$, this.breakpoint$]).pipe(
        map(([configuration, breakpoint]) => ({configuration, breakpoint}))
      ).subscribe(pair => {
        const channels = pair.configuration.twitch.channels;
        this.sizedChannels = channels.map(((value, index) => this.setCardAndVideoSize(value, index, pair.breakpoint.matches)));
      }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * If the screen is small, make all cards the whole width and one row
   * If the screen is larger, make the headlining card bigger and the rest small
   * @param channel - the channel that will eventually be shown
   * @param index - the channel's place on the dashboard
   * @param isSmallScreen - whether or not we are on a phone
   */
  setCardAndVideoSize(channel: string, index: number, isSmallScreen: boolean): TwitchCardMeasurements {
    let cols: 1 | 2 | 3;
    let rows: 1 | 2;

    if (isSmallScreen) {
      cols = 3;
      rows = 1;
    } else {
      cols = index === 0 ? 3 : 1;
      rows = index === 0 ? 2 : 1;
    }

    return {
      channel,
      cols,
      rows
    };
  }

}
