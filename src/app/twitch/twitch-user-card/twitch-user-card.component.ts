import {Component, Inject, Input, OnInit, SecurityContext} from '@angular/core';
import {TwitchAggregate} from '../api/twitch-aggregate-response.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-twitch-user-card',
  templateUrl: './twitch-user-card.component.html',
  styleUrls: ['./twitch-user-card.component.scss']
})
export class TwitchUserCardComponent implements OnInit {

  @Input()
  public details: TwitchAggregate;

  public offlineImageUrl: SafeResourceUrl;
  public videoUrl: SafeResourceUrl;
  public chatUrl: SafeResourceUrl;

  public offlineImagePad: string;

  private pinned = false;

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.offlineImageUrl = this.markSafe(this.configureOfflineImage());
    this.videoUrl = this.markSafe(this.details.videoUrl);
    this.chatUrl = this.markSafe(this.details.chatUrl);
  }

  private markSafe(url: string): SafeResourceUrl {
    if (!url) { return null; }
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.domSanitizer.sanitize(SecurityContext.URL, url.replace('{parent}', this.parent))
    );
  }

  private configureOfflineImage(): string {
    const primaryOfflineImageUrl = this.details.user.offline_image_url;
    if (primaryOfflineImageUrl.length > 0) {
      this.offlineImagePad = '100%';
      return primaryOfflineImageUrl;
    } else {
      // need to convert a 300x300 img to 16:9.
      this.offlineImagePad = '56.25%';
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
    this.pinned = !this.pinned;
    console.warn('Not implemented yet.');
  }

}
