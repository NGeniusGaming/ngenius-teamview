import {Injectable} from '@angular/core';
// @ts-ignore - the compiler is configured to import this.
import ConfigurationJson from '../../assets/configuration/config.json';
import {Configuration} from './configuration.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly configurationSubject: BehaviorSubject<Configuration> = new BehaviorSubject<Configuration>(null);

  /**
   * This contains the root configuration only.
   * @private
   */
  private rootConfigurationPartial: Partial<Configuration> = ConfigurationJson;

  constructor(private http: HttpClient) {
    http.get<Partial<Configuration>>(`${this.rootConfigurationPartial?.root?.apiUrl}v1/config`)
      .pipe(map(partialConfig => ({... this.rootConfigurationPartial, ...partialConfig}) as Configuration))
      .subscribe(config => this.configurationSubject.next(config));
  }

  /**
   * Return a subscription to configuration for the application.
   */
  public configuration(): Observable<Configuration> {
    // only allow 'truthy' configuration to be consumed.
    return this.configurationSubject.pipe(filter(value => !!value));
  }
}
