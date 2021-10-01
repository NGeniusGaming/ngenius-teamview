import {Component, Inject, Input, OnInit, Output, SecurityContext, EventEmitter, OnDestroy} from '@angular/core';
import {TwitchAggregate} from '../api/twitch-aggregate-response.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {ThemePalette} from '@angular/material/core';
import {TwitchChannelInteraction, TwitchChannelInteractionFeedbackLoop} from './twitch-channel-interaction.model';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-twitch-user-card',
  templateUrl: './twitch-user-card.component.html',
  styleUrls: ['./twitch-user-card.component.scss']
})
export class TwitchUserCardComponent implements OnInit, OnDestroy {

  @Input()
  public details: TwitchAggregate;
  @Input()
  public feedbackLoop: Observable<TwitchChannelInteractionFeedbackLoop>;

  public offlineImageUrl: SafeResourceUrl;
  public videoUrl: SafeResourceUrl;
  public chatUrl: SafeResourceUrl;
  public showChat = false;

  private pinned = false;
  private subscription = new Subscription();

  @Output()
  public channelInteraction = new EventEmitter<TwitchChannelInteraction>();

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.offlineImageUrl = this.markSafe(this.selectOfflineImage());
    this.videoUrl = this.markSafe(this.details.videoUrl);
    this.chatUrl = this.markSafe(this.details.chatUrl);

    this.subscription.add(
      this.feedbackLoop.subscribe(value => {
        this.pinned = value.pinned.indexOf(this.details.user.id) > -1;
        this.showChat = value.showingChat.indexOf(this.details.user.id) > -1;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private markSafe(url: string): SafeResourceUrl {
    if (!url) { return null; }
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.domSanitizer.sanitize(SecurityContext.URL, url.replace('{parent}', this.parent))
    );
  }

  /**
   * Prefer the users actual offline image, otherwise we turn their profile image
   * into a 16:9 image.  Users to better with a legit offline image though.
   */
  private selectOfflineImage(): string {
    const primaryOfflineImageUrl = this.details.user.offline_image_url;
    if (primaryOfflineImageUrl.length > 0) {
      return primaryOfflineImageUrl;
    } else {
      // need to convert a 300x300 img to 16:9.
      return this.details.user.profile_image_url;
    }
  }

  private get parent(): string {
    return this.document.location.hostname;
  }

  /**
   * Returns the correct ThemePalette for if the channel is pinned or not
   */
  public isPinned(): ThemePalette {
    return this.pinned ? 'accent' : undefined;
  }

  public pin() {
    const nextState = !this.pinned;
    // this.pinned = nextState;
    this.channelInteraction.emit(new TwitchChannelInteraction(this.details.user.id, nextState, nextState));
  }

  public get videoWidth(): number {
    return this.showChat ? 75 : 100;
  }

  public get chatWidth(): number {
    return 100 - this.videoWidth;
  }

  public get footerContent(): FooterContent {
    if (this.details.live) {
      return {
        title: this.details.stream?.title,
        metadata: [
          this.details.user.display_name,
          this.details.stream?.game_name
        ],
        chips: [
          this.details.stream?.language,
          this.details.stream?.viewer_count
        ]
      };
    } else {
      return {
        title: this.details.user.display_name,
        metadata: [],
        chips: [
          this.details.user.broadcaster_type
        ]
      };
    }
  }

}

interface FooterContent {
  title: string;
  // todo: these can be strings or numbers.
  metadata: any[];
  chips: any[];
}
