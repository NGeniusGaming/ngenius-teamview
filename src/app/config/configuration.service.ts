import {Injectable} from '@angular/core';
// @ts-ignore - the compiler is configured to import this.
import ConfigurationJson from '../../assets/configuration/config.json';
import {Configuration} from './configuration.model';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly configurationSubject: BehaviorSubject<Configuration>;

  private rawConfiguration: Configuration = ConfigurationJson;

  constructor() {
    this.configurationSubject = new BehaviorSubject<Configuration>(this.rawConfiguration);
  }

  /**
   * Return a subscription to configuration for the application.
   */
  public configuration(): Observable<Configuration> {
    return this.configurationSubject;
  }
}
