import {BehaviorSubject, combineLatest, interval, Observable, ReplaySubject} from 'rxjs';
import {ChannelConfiguration, RootConfiguration, Tab} from '../config/configuration.model';
import {EMPTY_TWITCH_STREAMS, TwitchStreamsResponse} from './api/twitch-streams.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ConfigurationService} from '../config/configuration.service';

export const REFRESH_MINUTES = 1;

const API_PATH = 'twitch/';

export abstract class TwitchServiceHelper {

  private _refreshTimer: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now()));
  private _rootConfiguration: BehaviorSubject<RootConfiguration> = new BehaviorSubject<RootConfiguration>(null);
  private _channels: BehaviorSubject<ChannelConfiguration[]> = new BehaviorSubject<ChannelConfiguration[]>([]);
  private _twitchApiResults: BehaviorSubject<TwitchStreamsResponse> = new BehaviorSubject<TwitchStreamsResponse>(EMPTY_TWITCH_STREAMS);
  private _twitchApiBuffer: ReplaySubject<TwitchStreamsResponse> = new ReplaySubject<TwitchStreamsResponse>(1);
  private _anyOnlineStreams: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);


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

    // watch for configuration changes to the channels
    // - this still passes through to other views and is used to determine online channels.
    this._configurationService.configuration().pipe(
      map(value => value.channels
        .filter(channel => channel.tabs.includes(_tab) && channel.platform === 'twitch')))
      .subscribe(value => this._channels.next(value));

    // explicitly keep track of if we found any online streams, and
    // subscribe the behavior subject to the results buffer.
    this._twitchApiBuffer.subscribe(results => {
      this._anyOnlineStreams.next(results.data.length > 0);
      this._twitchApiResults.next(results);
    });

    this._configurationService.configuration().pipe(map(value => value.root))
      .subscribe(value => this._rootConfiguration.next(value));

    // Using the latest config and our refresh timer, query twitch.
    combineLatest([this._rootConfiguration, this._refreshTimer]).pipe(
      map(([root, refreshTimer]) => ({root, refreshTimer}))
    ).subscribe(v => {
      this._httpClient.get<TwitchStreamsResponse>(`${v.root.apiUrl}${API_PATH}${this._tab}`)
        .subscribe((res: TwitchStreamsResponse) => this._twitchApiBuffer.next(res), error => {
          // TODO: Toast to the user somehow?
          console.error(`We can't get a hold of the ${v.root.applicationTitle} api!`, error);
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

  /**
   * Are any streams online? This returns true / false to help quickly decide.
   */
  public anyOnline(): Observable<boolean> {
    return this._anyOnlineStreams.asObservable();
  }

  protected channels$(): Observable<ChannelConfiguration[]> {
    return this._channels;
  }
}
