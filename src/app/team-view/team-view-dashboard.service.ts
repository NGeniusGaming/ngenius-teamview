import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {ConfigurationService} from '../config/configuration.service';
import {first, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TwitchServiceHelper} from '../twitch/twitch-service.helper';

@Injectable({
  providedIn: 'root'
})
export class TeamViewDashboardService extends TwitchServiceHelper {

  private _showingOfflineStreams: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(_configurationService: ConfigurationService,
              _httpClient: HttpClient) {
    super('team-view', _configurationService, _httpClient);
    this.anyOnline()
      .pipe(first())
      .subscribe(value => this._showingOfflineStreams.next(!value));
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
    return this.channels$().pipe(map(value => value.map(channel => channel.id)));
  }

  public filteredChannels(channels: string[], showingOfflineStreams: boolean): string[] {
    return showingOfflineStreams ? [...channels] : this.onlineChannelsOnly(channels);
  }
}
