import { Injectable } from '@angular/core';
import {ConfigurationService} from '../../config/configuration.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentDashboardMixerService {

  constructor(private _configurationService: ConfigurationService) { }

  public channels(): Observable<string[]> {
    return this._configurationService.configuration()
      .pipe(
        map(value => value.channels
          .filter(channel => channel.platform === 'mixer' && channel.tabs.includes('tournament'))
          .map(channel => channel.id))
      );
  }
}
