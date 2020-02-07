import {BehaviorSubject, combineLatest, interval, Observable} from 'rxjs';
import {TwitchApiConfiguration} from '../config/configuration.model';
import {EMPTY_TWITCH_STREAMS, TwitchStreamsResponse} from './api/twitch-streams.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export const REFRESH_MINUTES = 1;

export abstract class TwitchServiceHelper {

  private _refreshTimer: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now() - 16 * 1000));
  private _twitchApiConfiguration: BehaviorSubject<TwitchApiConfiguration> = new BehaviorSubject<TwitchApiConfiguration>(null);
  private _channels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private _twitchApiResults: BehaviorSubject<TwitchStreamsResponse> = new BehaviorSubject<TwitchStreamsResponse>(EMPTY_TWITCH_STREAMS);


  /**
   * A helper to abstract away the complicated logic of working with and determining details on a group of twitch channels.
   *
   * @param _twitchApiConfigurationObservable the observable of configuration to use as the root of twitch interaction.
   * @param _httpClient to make calls to the Twitch API on behalf of the service.
   */
  protected constructor(private _twitchApiConfigurationObservable: Observable<TwitchApiConfiguration>,
                        private _httpClient: HttpClient) {
    // configure a refresh of twitch data.
    interval(REFRESH_MINUTES * 60 * 1000)
      .pipe(map(_ => new Date(Date.now())))
      .subscribe(value => this._refreshTimer.next(value));

    // watch for configuration changes.
    this._twitchApiConfigurationObservable.subscribe(value => {
      this._twitchApiConfiguration.next(value);
      this._channels.next(value.channels);
    });

    // Using the latest config and our refresh timer, query twitch.
    combineLatest([this._twitchApiConfiguration, this._refreshTimer]).pipe(
      map(([tConfigObservable, refreshTimer]) => ({twitchConfigObservable: tConfigObservable, refreshTimer}))
    ).subscribe(v => {
      const queryParams = v.twitchConfigObservable.channels.map(channel => `user_login=${channel}`).join('&');
      this._httpClient.get<TwitchStreamsResponse>(`https://api.twitch.tv/helix/streams?${queryParams}`, {
        headers: new HttpHeaders({
          'Client-ID': v.twitchConfigObservable.clientId
        }) // receive the next twitch streams response data and save it.
      }).subscribe((res: TwitchStreamsResponse) => this._twitchApiResults.next(res), error => {
        // TODO: Toast to the user somehow?
        console.error(`We're hitting our twitch rate limit.... Hold on for dear life!`, error);
      });
    });
  }

  /**
   * Helper to receive either all the channels provided, or only those that are online
   * which are cross referenced with the twitch api results.
   * @param channels to check against the twitch api
   */
  public onlineChannelsOnly(channels: string[]): string[] {
    const onlineStreams = this._twitchApiResults.getValue().data;
    const onlineStreamNames = onlineStreams.map(stream => stream.user_name.toLowerCase());
    return [...channels].filter(value => onlineStreamNames.includes(value.toLowerCase()));
  }

  protected channels$(): Observable<string[]> {
    return this._channels;
  }
}
