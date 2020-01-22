import {Component, Input, OnInit, SecurityContext} from '@angular/core';
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
  public height = 300;
  // maintain a 3:4 ratio
  public width = (this.height * 4) / 3;

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
