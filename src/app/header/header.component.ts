import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../config/configuration.service';
import {Subscription} from 'rxjs';
import {Configuration} from '../config/configuration.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public configuration: Configuration;

  private _subscription: Subscription = new Subscription();

  constructor(private _configurationService: ConfigurationService) { }

  ngOnInit() {
    this._subscription.add(
      this._configurationService
        .configuration()
        .subscribe(value => this.configuration = value)
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
