import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material';
import {ConfigurationService} from '../config/configuration.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private _showingOfflineStreams: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _channels: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private _configurationService: ConfigurationService) {
    this._configurationService.configuration().pipe(
      map(value => value.twitch.channels)
    ).subscribe(value => this._channels.next(value));
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
    return combineLatest([this._channels, this._showingOfflineStreams]).pipe(
      map(([channels, isShowingOfflineStreams]) => ({channels, isShowingOfflineStreams})),
      map(this._reducedChannels)
    );
  }

  public reorderedChannels(channels: string[]) {
    this._channels.next(channels);
  }

  private _reducedChannels(combined: { channels: string[], isShowingOfflineStreams: boolean }): string[] {
    // TODO: we should do something with the fact that we are showing offline streams here
    // BUT: we need to merge this with the twitch API at this point.
    console.log(combined.channels);
    return combined.channels;
  }
}
