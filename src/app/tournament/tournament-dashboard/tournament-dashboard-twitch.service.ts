import {Injectable} from '@angular/core';
import {TwitchServiceHelper} from '../../twitch/twitch-service.helper';
import {ConfigurationService} from '../../config/configuration.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentDashboardTwitchService extends TwitchServiceHelper {

  constructor(_configurationService: ConfigurationService, _httpClient: HttpClient) {
    super(_configurationService.configuration().pipe(map(value => value.tournament.twitch)), _httpClient);
  }

  public channels(): Observable<string[]> {
    return this.channels$();
  }

}
