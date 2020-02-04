import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../../config/configuration.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {ThemePalette} from '@angular/material';
import {TwitchService} from '../twitch.service';
import {Column, Row, TwitchCardMeasurements} from './twitch-card-measurements.model';

@Component({
  selector: 'app-twitch-dashboard',
  templateUrl: './twitch-dashboard.component.html',
  styleUrls: ['./twitch-dashboard.component.scss']
})
export class TwitchDashboardComponent implements OnInit, OnDestroy {

  private sizedChannels: TwitchCardMeasurements[];

  private _subscription = new Subscription();

  private _pinnedChannels: string[] = [];

  private breakpoint$: Observable<BreakpointState>;

  constructor(private _configurationService: ConfigurationService,
              private _twitchService: TwitchService,
              private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {

    this.breakpoint$ = this._breakpointObserver.observe(Breakpoints.Handset);
    this._breakpointObserver.observe(Breakpoints.Handset).subscribe(v => console.log(v));

    this._subscription.add(
      combineLatest([this._twitchService.channels(), this.breakpoint$]).pipe(
        map(([channels, breakpoint]) => ({channels, breakpoint}))
      ).subscribe(pair => {
        console.log('test');
        const channels = [...pair.channels];
        const newSizedChannels = channels.map(((value, index) => this.setCardAndVideoSize(value, index, pair.breakpoint.matches)));
        if (JSON.stringify(this.sizedChannels) !== JSON.stringify(newSizedChannels)) {
          // if the sized channels have changed in some way, re-set them, which causes them to reload.
          this.sizedChannels = newSizedChannels;
          this._resortChannels();
        }
      }));

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public pin(channel: string) {
    let currentPins = [...this._pinnedChannels];
    const index = currentPins.indexOf(channel);
    if (index > -1) {
      // remove the item from the pinned channels
      currentPins.splice(index, 1);
    } else {
      // add the channel to the front of the array
      currentPins = [channel, ...currentPins.slice(0, 1)];
    }
    this._pinnedChannels = currentPins;
    this._resortChannels();
  }

  private _resortChannels() {
    const sortedChannels = [...this.sizedChannels]
      .map(value => value.channel)
      .sort((a, b) => this.weightOfPin(b) - this.weightOfPin(a));
    this._twitchService.reorderedChannels(sortedChannels);
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
