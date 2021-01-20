import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../config/configuration.service';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {TeamViewDashboardService} from './team-view-dashboard.service';
import {Column, Row} from './twitch-card-measurements.model';
import {TwitchAggregate} from '../twitch/api/twitch-aggregate-response.model';
import {TwitchChannelInteraction, TwitchChannelInteractionFeedbackLoop} from '../twitch/twitch-user-card/twitch-channel-interaction.model';

@Component({
  selector: 'app-twitch-dashboard',
  templateUrl: './team-view-dashboard.component.html',
  styleUrls: ['./team-view-dashboard.component.scss']
})
export class TeamViewDashboardComponent implements OnInit, OnDestroy {

  public twitchAggregation: TwitchAggregate[];

  private _subscription = new Subscription();

  private pinnedChannels: string[] = [];
  private showingChat: string[] = [];

  public channelFeedbackLoop
    = new BehaviorSubject<TwitchChannelInteractionFeedbackLoop>(
      new TwitchChannelInteractionFeedbackLoop(this.pinnedChannels, this.showingChat)
  );

  private breakpoint$: Observable<BreakpointState>;

  private isSmallScreen = false;

  /**
   * Used to force a refresh of the dashboard.
   */
  private _refreshView: BehaviorSubject<undefined> = new BehaviorSubject<undefined>(undefined);

  constructor(private _configurationService: ConfigurationService,
              private _twitchService: TeamViewDashboardService,
              private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {

    this.breakpoint$ = this._breakpointObserver.observe(Breakpoints.Handset);

    this._subscription.add(
      this.breakpoint$.subscribe(value => this.isSmallScreen = value.matches)
    );

    this._subscription.add(
      this.channelFeedbackLoop.subscribe(() => this.syntheticSort())
    )

    this._subscription.add(
      combineLatest([
          this._twitchService.twitchAggregation(),
          this._twitchService.showingOfflineStreams(),
          this.breakpoint$,
          this._refreshView
        ]
      ).pipe(
        map((
          [aggregation, showingOfflineStreams, breakpoint, refresh]) =>
          ({aggregation, showingOfflineStreams, breakpoint, refresh}))
      ).subscribe(data => {
        if (data.showingOfflineStreams) {
          this.twitchAggregation = data.aggregation;
        } else {
          this.twitchAggregation = data.aggregation.filter(value => value.live);
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  trackVideoCards(_: number, item: TwitchAggregate): string {
    if (!item) {
      return null;
    }
    return `${item.user.display_name}_live:${item.live}`;
  }

  /**
   * If the screen is small, make all cards the whole width and one row
   * If the screen is larger, make the headlining card bigger and the rest small
   * @param index - the channel's place on the dashboard
   */
  cardSize(index: number): { cols, rows } {
    let cols: Column;
    let rows: Row;

    if (this.isSmallScreen) {
      [cols, rows] = [6, 2];
    } else {
      [cols, rows] = this.calculateCardSizeForDesktop(index);
    }

    return {
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
    const multiPins = this.pinnedChannels.length > 1;

    if (multiPins) {
      return (index < 2) ? [3, 3] : [2, 2];
    } else {
      return (index < 1) ? [6, 4] : [2, 2];
    }
  }

  public receiveChannelInteraction(interaction: TwitchChannelInteraction) {
    if (interaction.pinned) {
      this.pinnedChannels = [interaction.id, ...this.pinnedChannels].slice(0, 2);
    } else {
      const index = this.pinnedChannels.indexOf(interaction.id);
      this.pinnedChannels.splice(index, 1);
    }
    // gives us framework to show chat separate from pins.
    this.showingChat = this.pinnedChannels;

    this.channelFeedbackLoop.next(new TwitchChannelInteractionFeedbackLoop(this.pinnedChannels, this.showingChat));
  }

  private syntheticSort() {
    if (!this.twitchAggregation) { return; }

    const copy = [...this.twitchAggregation];

    // these are ids
    const first = this.pinnedChannels.length > 0 ? this.pinnedChannels[0] : null;
    const second = this.pinnedChannels.length > 1 ? this.pinnedChannels[1] : null;

    const firstChannel = !!first ? copy.find(value => value.user.id === first) : null;
    const secondChannel = !!second ? copy.find(value => value.user.id === second) : null;

    const top = [firstChannel, secondChannel].filter(value => !!value);

    const bottom = copy.filter(value => top.indexOf(value) === -1);
    bottom.sort( (a, b) => a.index - b.index);

    this.twitchAggregation = [...top, ...bottom];
  }

}
