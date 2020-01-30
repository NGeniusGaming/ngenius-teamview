import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private _showingOfflineStreams: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
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
}
