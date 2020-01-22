import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../config/configuration.service';
import {Subscription} from 'rxjs';
import {Configuration} from '../config/configuration.model';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public configuration: Configuration;

  private _subscription: Subscription = new Subscription();
  private _activeTab: Map<string, boolean> = new Map<string, boolean>([['twitch', false]]);

  constructor(private _configurationService: ConfigurationService, private _router: Router) { }

  ngOnInit() {
    this._subscription.add(
      this._configurationService
        .configuration()
        .subscribe(value => this.configuration = value)
    );

    this._subscription.add(
      this._router.events
        .pipe(
          filter(value => value instanceof NavigationEnd),
          map(value => value as NavigationEnd)
        ).subscribe(navigation => this.navigationEnd(navigation))
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * Whether or not the expected url is currently active.
   * @param expectedUrl to watch.
   */
  public isActive(expectedUrl: string): boolean {
    return this._activeTab.get(expectedUrl);
  }

  /**
   * Receive {NavigationEnd} events and update the active tabs based on the event.
   * @param navigation to extract the url from.
   */
  private navigationEnd(navigation: NavigationEnd) {
    const newActiveParts = navigation.urlAfterRedirects.split('/');
    const newActive = newActiveParts[newActiveParts.length - 1];
    // reset all active tabs
    [...this._activeTab.keys()].forEach((key) => {
      this._activeTab.set(key, false);
    });
    // update the now active tab.
    this._activeTab.set(newActive, true);
  }

}
