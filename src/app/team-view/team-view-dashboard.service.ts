import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ConfigurationService} from '../config/configuration.service';
import {first} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {TwitchServiceHelper} from '../twitch/twitch-service.helper';
import {TwitchChannelInteraction} from '../twitch/twitch-user-card/twitch-channel-interaction.model';

@Injectable({
  providedIn: 'root'
})
export class TeamViewDashboardService extends TwitchServiceHelper {

  private showingOfflineStreams: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private pinnedChannels: string[] = [];
  private showingChat: string[] = [];

  private pinnedChannelsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private showingChatSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(configurationService: ConfigurationService,
              httpClient: HttpClient) {
    super('team-view', configurationService, httpClient);
    this.anyOnline()
      .pipe(first())
      .subscribe(value => this.showingOfflineStreams.next(!value));
  }

  /**
   * When we have received a {MatSlideToggleChange} from the
   * button to show offline streams, we need to publish the state
   * of this event to the behavior subject.
   *
   * @param event - the {MatSlideToggleChange} event for the toggle
   */
  public showOfflineStreamsToggle(event: MatSlideToggleChange) {
    this.showingOfflineStreams.next(event.checked);
  }

  /**
   * Return the observable to whether or not we are showing offline streams.
   */
  public isShowingOfflineStreams(): Observable<boolean> {
    return this.showingOfflineStreams;
  }

  /**
   * Returns a hook to watch which channels are pinned.
   */
  public pinnedChannelsObservable(): Observable<string[]> {
    return this.pinnedChannelsSubject.asObservable();
  }

  /**
   * Returns a hook to watch which channels are showing their chat.
   */
  public showingChatObservable(): Observable<string[]> {
    return this.showingChatSubject.asObservable();
  }

  /**
   * Keep track of channel interactions at this service level so they persist even if the user leaves
   * the tab and comes back.
   * @param interaction - which channel was touched and what changed.
   */
  public channelInteraction(interaction: TwitchChannelInteraction) {
    if (interaction.pinned) {
      this.pinnedChannels = [interaction.id, ...this.pinnedChannels].slice(0, 2);
    } else {
      const index = this.pinnedChannels.indexOf(interaction.id);
      this.pinnedChannels.splice(index, 1);
    }
    // gives us framework to show chat separate from pins.
    this.showingChat = this.pinnedChannels;

    this.pushUpdates();
  }

  /**
   * Update things that need to change when a channel is updated.
   * @private
   */
  private pushUpdates() {
    this.pinnedChannelsSubject.next(this.pinnedChannels);
    this.showingChatSubject.next(this.showingChat);
  }
}
