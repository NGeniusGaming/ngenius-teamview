import {Component, ElementRef, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-twitch-custom-video-chat',
  templateUrl: './twitch-custom-video-chat.component.html',
  styleUrls: ['./twitch-custom-video-chat.component.scss']
})
export class TwitchCustomVideoChatComponent implements OnInit {

  public safeUrl: SafeResourceUrl;
  public chatUrl: SafeResourceUrl;
  @Input()
  public channel: string;

  @ViewChild('twitchContainer')
  public twitchContainer: ElementRef;

  constructor(private _domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // Make the resource a {SafeResourceUrl}
    this.safeUrl = this._safe( `https://player.twitch.tv/?channel=${this.channel}&muted=true`);
    this.chatUrl = this._safe(`https://www.twitch.tv/embed/${this.channel}/chat`);
  }

  private _safe(url: string): SafeResourceUrl {
    // Make the resource a {SafeResourceUrl}
    return this._domSanitizer.bypassSecurityTrustResourceUrl(
      // guarantee there are no XSS attacks
      this._domSanitizer.sanitize(SecurityContext.URL, url)
    );
  }
}
