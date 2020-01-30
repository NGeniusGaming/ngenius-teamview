import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {ConfigurationService} from '../../config/configuration.service';
import {BehaviorSubject, combineLatest, Observable, Subscription, from} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {ThemePalette} from '@angular/material';

type Column = 1 | 2 | 3 | 4 | 5 | 6;
type Row = 1 | 2 | 3 | 4;

interface TwitchCardMeasurements {
  readonly channel: string;
  readonly cols: Column;
  readonly rows: Row;
}

@Component({
  selector: 'app-twitch-dashboard',
  templateUrl: './twitch-dashboard.component.html',
  styleUrls: ['./twitch-dashboard.component.scss']
})
export class TwitchDashboardComponent implements OnInit, OnDestroy {

  public sizedChannels: TwitchCardMeasurements[];

  private _subscription = new Subscription();

  private _pinnedChannels: string[] = [];

  private channels$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private breakpoint$: Observable<BreakpointState>;

  constructor(private _configurationService: ConfigurationService,
              private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this._subscription.add(
      this._configurationService.configuration().pipe(
        map(value => value.twitch.channels)
      ).subscribe(value => this.channels$.next(value)));

    this.breakpoint$ = this._breakpointObserver.observe(Breakpoints.Handset);

    this._subscription.add(
      combineLatest([this.channels$, this.breakpoint$]).pipe(
        map(([channels, breakpoint]) => ({channels, breakpoint}))
      ).subscribe(pair => {
        const channels = pair.channels;
        this.sizedChannels = channels.map(((value, index) => this.setCardAndVideoSize(value, index, pair.breakpoint.matches)));
      }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * Pin a new channel - only the last 2 channels pinned are kept.
   * After the pinned channels are calculated, sort and re-emit the ordered channels.
   *
   * @param channel to pin
   */
  pin(channel: string) {
    const index = this._pinnedChannels.indexOf(channel);
    if (index > -1) {
      // remove the item from the pinned channels
      this._pinnedChannels.splice(index, 1);
    } else {
      // add the channel to the front of the array
      this._pinnedChannels = [channel, ...this._pinnedChannels.slice(0, 1)];
    }
    const sortedChannels = [...this.sizedChannels]
      .map(value => value.channel)
      .sort((a, b) => this.weightOfPin(b) - this.weightOfPin(a));
    this.channels$.next(sortedChannels);
  }

  /**
   * translate a place in the pinned channels array to a weight for the card location on the screen.
   * @param channel to calculate the weight of.
   */
  private weightOfPin(channel: string): number {
    const index = this._pinnedChannels.indexOf(channel);
    switch (index) {
      case (0):
        return 2;
      case(1):
        return 1;
      default:
        return 0;
    }
  }

  /**
   * Returns the correct ThemePalette for if the channel is pinned or not
   * @param channel to check if it is pinned.
   */
  isPinned(channel: string): ThemePalette {
    return this._pinnedChannels.indexOf(channel) > -1 ? 'accent' : undefined;
  }

  /**
   * If the screen is small, make all cards the whole width and one row
   * If the screen is larger, make the headlining card bigger and the rest small
   * @param channel - the channel that will eventually be shown
   * @param index - the channel's place on the dashboard
   * @param isSmallScreen - whether or not we are on a phone
   */
  setCardAndVideoSize(channel: string, index: number, isSmallScreen: boolean): TwitchCardMeasurements {
    let cols: Column;
    let rows: Row;

    if (isSmallScreen) {
      [cols, rows] = [6, 2];
    } else {
      [cols, rows] = this.calculateCardSizeForDesktop(index);
    }

    return {
      channel,
      cols,
      rows
    };
  }

  /**
   *
   * @param index of the current card
   * @returns the column and row calculation for this card
   */
  calculateCardSizeForDesktop(index: number): [Column, Row] {
    const multiPins = this._pinnedChannels.length > 1;

    if (multiPins) {
      return (index < 2) ? [3, 3] : [2, 2];
    } else {
      return (index < 1) ? [6, 4] : [2, 2];
    }
  }

}
