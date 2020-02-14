import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {ConfigurationService} from '../../config/configuration.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TwitchServiceHelper} from '../twitch-service.helper';

@Injectable({
  providedIn: 'root'
})
export class TeamViewDashboardService extends TwitchServiceHelper {

  private _showingOfflineStreams: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(_configurationService: ConfigurationService,
              _httpClient: HttpClient) {
    super('team-view', _configurationService, _httpClient);
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
