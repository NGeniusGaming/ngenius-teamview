import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../../config/configuration.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-twitch-dashboard',
  templateUrl: './twitch-dashboard.component.html',
  styleUrls: ['./twitch-dashboard.component.scss']
})
export class TwitchDashboardComponent implements OnInit, OnDestroy {

  public channels: string[];

  private _subscription = new Subscription();

  constructor(private _configurationService: ConfigurationService) { }

  ngOnInit() {
    this._subscription.add(
      this._configurationService.configuration()
        .subscribe(value => this.channels = value.twitch.channels)
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
