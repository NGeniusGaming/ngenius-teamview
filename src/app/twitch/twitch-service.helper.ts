import {BehaviorSubject, combineLatest, interval, Observable} from 'rxjs';
import {ChannelConfiguration, Tab, TwitchApiConfiguration} from '../config/configuration.model';
import {EMPTY_TWITCH_STREAMS, TwitchStreamsResponse} from './api/twitch-streams.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ConfigurationService} from '../config/configuration.service';

export const REFRESH_MINUTES = 1;

export abstract class TwitchServiceHelper {

  private _refreshTimer: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now()));
  private _twitchApiConfiguration: BehaviorSubject<TwitchApiConfiguration> = new BehaviorSubject<TwitchApiConfiguration>(null);
  private _channels: BehaviorSubject<ChannelConfiguration[]> = new BehaviorSubject<ChannelConfiguration[]>([]);
  private _twitchApiResults: BehaviorSubject<TwitchStreamsResponse> = new BehaviorSubject<TwitchStreamsResponse>(EMPTY_TWITCH_STREAMS);


  /**
   * A helper to abstract away the complicated logic of working with and determining details on a group of twitch channels.
   *
   * @param _tab that twitch data should be returned for.
   * @param _configurationService with which to extract data for this service.
   * @param _httpClient to make calls to the Twitch API on behalf of the service.
   */
  protected constructor(private _tab: Tab,
                        private _configurationService: ConfigurationService,
                        private _httpClient: HttpClient) {
    // configure a refresh of twitch data.
    interval(REFRESH_MINUTES * 60 * 1000)
      .pipe(map(_ => new Date(Date.now())))
      .subscribe(value => this._refreshTimer.next(value));

    // watch for configuration changes to the channels.
    this._configurationService.configuration().pipe(
      map(value => value.channels
        .filter(channel => channel.tabs.includes(_tab) && channel.platform === 'twitch')))
      .subscribe(value => this._channels.next(value));

    this._configurationService.configuration().pipe(map(value => value.api.twitch))
      .subscribe(value => this._twitchApiConfiguration.next(value));

    // Using the latest config and our refresh timer, query twitch.
    combineLatest([this._twitchApiConfiguration, this._channels, this._refreshTimer]).pipe(
      map(([twitchApi, channels, refreshTimer]) => ({twitchApi, channels, refreshTimer}))
    ).subscribe(v => {
      const queryParams = v.channels.map(channel => `user_login=${channel.id}`).join('&');
      this._httpClient.get<TwitchStreamsResponse>(`https://api.twitch.tv/helix/streams?${queryParams}`, {
        headers: new HttpHeaders({
          'Client-ID': v.twitchApi.clientId
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

  protected channels$(): Observable<ChannelConfiguration[]> {
    return this._channels;
  }
}
