import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
declare const Twitch: any;

@Component({
  selector: 'app-chat-window',
  templateUrl: './embed-everything.component.html',
  styleUrls: ['./embed-everything.component.scss']
})

export class EmbedEverythingComonent implements OnInit {

  public safeUrl: SafeResourceUrl;
  @Input()
  public channel: string;

  @ViewChild('twitchContainer', {static: false})
  public twitchContainer: ElementRef;

  constructor(private _domSanitizer: DomSanitizer,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    const options = {
      width: '100%',
      height: '100%',
      channel: this.channel
    };
    const player = new Twitch.Embed('pinned-channel', options);
    player.setVolume(0.5);
  }
}
