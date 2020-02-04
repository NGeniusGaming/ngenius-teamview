import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material';
import {ConfigurationService} from '../config/configuration.service';
import {map} from 'rxjs/operators';
import {interval} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TwitchServiceConfiguration} from '../config/configuration.model';
import {EMPTY_TWITCH_STREAMS, TwitchStreamsResponse} from './api/twitch-streams.model';

export const REFRESH_MINUTES = 1;

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private _showingOfflineStreams: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _channels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _twitchConfig: BehaviorSubject<TwitchServiceConfiguration> = new BehaviorSubject<TwitchServiceConfiguration>(null);
  private _twitchApiResults: BehaviorSubject<TwitchStreamsResponse> = new BehaviorSubject<TwitchStreamsResponse>(EMPTY_TWITCH_STREAMS);
  // this allows us to refresh the live channels once per minute.
  private _refreshTimer: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now() - 16 * 1000));

  constructor(private _configurationService: ConfigurationService,
              private _httpClient: HttpClient) {
    const twitchConfigObservable = this._configurationService.configuration()
      .pipe(map(value => value.twitch));

    interval(REFRESH_MINUTES * 60 * 1000)
      .pipe(map(_ => new Date(Date.now())))
      .subscribe(value => this._refreshTimer.next(value));
    twitchConfigObservable.subscribe(value => {
      this._twitchConfig.next(value);
      this._channels.next(value.channels);
    });

    // configure the set of twitch channels + the refresh interval
    combineLatest([twitchConfigObservable, this._refreshTimer]).pipe(
      map(([tConfigObservable, refreshTimer]) => ({twitchConfigObservable: tConfigObservable, refreshTimer}))
    ).subscribe(v => {
        const queryParams = v.twitchConfigObservable.channels.map(channel => `user_login=${channel}`).join('&');
        this._httpClient.get<TwitchStreamsResponse>(`https://api.twitch.tv/helix/streams?${queryParams}`, {
          headers: new HttpHeaders({
            'Client-ID': v.twitchConfigObservable.clientId
          })
        })
          .subscribe((res: TwitchStreamsResponse) => this._twitchApiResults.next(res), error => {
            console.error(`We're hitting our twitch rate limit.... Hold on for dear life!`, error);
          });
      }
    );
  }

  /**
   * When we have received a {MatSlideToggleChange} from the
   * button to show offline streams, we need to publish the state
   * of this event to the behavior subject.
   *
   * @param event - the {MatSlideToggleChange} event for the toggle
   */
  public showOfflineStreamsToggle(event: MatSlideToggleChange) {
    this._showingOfflineStreams.next(event.checked);
  }

  /**
   * Return the observable to whether or not we are showing offline streams.
   */
  public showingOfflineStreams(): Observable<boolean> {
    return this._showingOfflineStreams;
  }

  public channels(): Observable<string[]> {
    return combineLatest([this._channels, this._showingOfflineStreams, this._twitchApiResults]).pipe(
      map(([channels, isShowingOfflineStreams, streams]) => ({channels, isShowingOfflineStreams, streams})),
      map(this._reducedChannels)
    );
  }

  public reorderedChannels(channels: string[]) {
    console.log('received reordered channels: %o', channels);
    this._channels.next(channels);
  }

  private _reducedChannels(combined: { channels: string[], isShowingOfflineStreams: boolean, streams: TwitchStreamsResponse }): string[] {
    console.log('mapping the next channels');
    if (combined.isShowingOfflineStreams) {
      // all channels from config
      return combined.channels;
    } else {
      // just ones we received from the twitch api - which only returns the stream if it is live
      const onlineStreams = combined.streams.data;
      const onlineStreamNames = onlineStreams.map(stream => stream.user_name.toLowerCase());

      return combined.channels.filter(value => onlineStreamNames.includes(value.toLowerCase()));
    }
  }
}
