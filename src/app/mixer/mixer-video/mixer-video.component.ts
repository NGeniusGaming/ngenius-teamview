import {Component, ElementRef, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-mixer-video',
  templateUrl: './mixer-video.component.html',
  styleUrls: ['./mixer-video.component.scss']
})
export class MixerVideoComponent implements OnInit {

  public safeUrl: SafeResourceUrl;
  public chatUrl: SafeResourceUrl;

  @Input()
  public channel: string;

  @ViewChild('mixerContainer', {static: false})
  public twitchContainer: ElementRef;

  constructor(private _domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // Make the resource a {SafeResourceUrl}
    this.safeUrl = this._safe(`https://mixer.com/embed/player/${this.channel}?muted=true&composer=true`);
    this.chatUrl = this._safe(`https://mixer.com/embed/chat/${this.channel}`);
  }

  private _safe(url: string): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(
      // guarantee there are no XSS attacks
      this._domSanitizer.sanitize(SecurityContext.URL, url)
    );
  }

}
