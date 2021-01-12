import {Component, ElementRef, Inject, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-twitch-video-chat',
  templateUrl: './twitch-video-chat.component.html',
  styleUrls: ['./twitch-video-chat.component.scss']
})
export class TwitchVideoChatComponent implements OnInit {

  public safeUrl: SafeResourceUrl;
  public chatUrl: SafeResourceUrl;
  @Input()
  public channel: string;
  @Input()
  public videoPercent: number;

  @ViewChild('twitchContainer')
  public twitchContainer: ElementRef;

  constructor(
    private _domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    // Make the resource a {SafeResourceUrl}
    this.safeUrl = this._safe( `https://player.twitch.tv/?channel=${this.channel}&muted=true&autoplay=false&parent=${this.parent}`);
    this.chatUrl = this._safe(`https://www.twitch.tv/embed/${this.channel}/chat?parent=${this.parent}&darkpopout`);
  }

  private _safe(url: string): SafeResourceUrl {
    // Make the resource a {SafeResourceUrl}
    return this._domSanitizer.bypassSecurityTrustResourceUrl(
      // guarantee there are no XSS attacks
      this._domSanitizer.sanitize(SecurityContext.URL, url)
    );
  }

  private get parent(): string {
    return this.document.location.hostname;
  }

  public videoPercentage(): number {
    if (this.videoPercent <= 0 || this.videoPercent > 100) {
      throw Error('video percent must be greater than 0 and not exceeding 100. Actual was ' + this.videoPercent);
    }
    return this.videoPercent;
  }

  public chatPercentage(): number {
    return 100 - this.videoPercent;
  }

  public showChat(): boolean {
    return this.chatPercentage() > 0;
  }
}
