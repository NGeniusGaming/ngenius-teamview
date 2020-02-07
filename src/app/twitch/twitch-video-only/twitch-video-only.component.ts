import {Component, ElementRef, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-twitch-video-only',
  templateUrl: './twitch-video-only.component.html',
  styleUrls: ['./twitch-video-only.component.scss']
})
export class TwitchVideoOnlyComponent implements OnInit {

  public safeUrl: SafeResourceUrl;
  @Input()
  public channel: string;

  @ViewChild('twitchContainer', {static: false})
  public twitchContainer: ElementRef;

  constructor(private _domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // Make the resource a {SafeResourceUrl}
    this.safeUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
      // guarantee there are no XSS attacks
      this._domSanitizer.sanitize(SecurityContext.URL, `https://player.twitch.tv/?channel=${this.channel}&muted=true`)
    );
  }
}
