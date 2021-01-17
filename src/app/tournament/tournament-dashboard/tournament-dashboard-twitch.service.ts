import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../config/configuration.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TwitchServiceHelper} from '../../twitch/twitch-service.helper';

@Injectable({
  providedIn: 'root'
})
export class TournamentDashboardTwitchService extends TwitchServiceHelper {

  constructor(_configurationService: ConfigurationService, _httpClient: HttpClient) {
    super('tournament', _configurationService, _httpClient);
  }

  public channels(): Observable<string[]> {
    return this.channels$().pipe(map(value => value.map(channel => channel.displayName)));
  }

}
