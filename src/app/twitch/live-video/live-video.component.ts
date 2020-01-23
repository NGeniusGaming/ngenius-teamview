import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.scss']
})
export class LiveVideoComponent implements OnInit {

  public safeUrl: SafeResourceUrl;
  @Input()
  public channel: string;

  @ViewChild('twitchContainer', {static: false})
  public twitchContainer: ElementRef;

  constructor(private _domSanitizer: DomSanitizer,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Make the resource a {SafeResourceUrl}
    this.safeUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(
      // guarantee there are no XSS attacks
      this._domSanitizer.sanitize(SecurityContext.URL, `https://player.twitch.tv/?channel=${this.channel}&muted=true`)
    );
  }
}
