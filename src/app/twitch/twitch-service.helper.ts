import {BehaviorSubject, combineLatest, interval, Observable, ReplaySubject} from 'rxjs';
import {RootConfiguration, Tab} from '../config/configuration.model';
import {HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';
import {ConfigurationService} from '../config/configuration.service';
import {TwitchAggregate} from './api/twitch-aggregate-response.model';

export const REFRESH_MINUTES = 1;

const API_PATH = 'v1/twitch/';

export abstract class TwitchServiceHelper {

  private _refreshTimer: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(Date.now()));
  private _rootConfiguration: BehaviorSubject<RootConfiguration> = new BehaviorSubject<RootConfiguration>(null);
  private _twitchApiResults: BehaviorSubject<TwitchAggregate[]> = new BehaviorSubject<TwitchAggregate[]>([]);
  private _twitchApiBuffer: ReplaySubject<TwitchAggregate[]> = new ReplaySubject<TwitchAggregate[]>(1);
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

    // explicitly keep track of if we found any online streams, and
    // subscribe the behavior subject to the results buffer.
    this._twitchApiBuffer.subscribe(results => {
      this._anyOnlineStreams.next(results.some(res => res.live));
      this._twitchApiResults.next(results);
    });

    this._configurationService.configuration()
      .pipe(map(value => value.root))
      .subscribe(value => this._rootConfiguration.next(value));

    // Using the latest config and our refresh timer, query twitch.
    combineLatest([this._rootConfiguration, this._refreshTimer]).pipe(
      map(([root, refreshTimer]) => ({root, refreshTimer})),
      filter(value => !!value.root)
    ).subscribe(v => {
      this._httpClient.get<TwitchAggregate[]>(`${v.root.apiUrl}${API_PATH}${this._tab}`)
        .subscribe((res: TwitchAggregate[]) => this._twitchApiBuffer.next(res), error => {
          // TODO: Toast to the user somehow?
          console.error(`We can't get a hold of the ${v.root.applicationTitle} api!`, error);
        });
    });
  }

  public twitchAggregation(): Observable<TwitchAggregate[]> {
    return this._twitchApiResults.asObservable();
  }
  /**
   * Are any streams online? This returns true / false to help quickly decide.
   */
  public anyOnline(): Observable<boolean> {
    return this._anyOnlineStreams.asObservable();
  }
}
