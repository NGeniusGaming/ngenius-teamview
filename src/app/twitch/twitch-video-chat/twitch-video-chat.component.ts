import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

declare const Twitch: any;

@Component({
  selector: 'app-twitch-video-chat',
  templateUrl: './twitch-video-chat.component.html',
  styleUrls: ['./twitch-video-chat.component.scss']
})

export class TwitchVideoChatComponent implements OnInit, AfterViewInit {
  @Input()
  public channel: string;

  @ViewChild('twitchContainer', {static: false})
  public twitchContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('channel %s', this.channel);
    const options = {
      width: '100%',
      height: '100%',
      channel: this.channel
    };
    const player = new Twitch.Embed(this.channel, options);
    // player.setVolume(0.5);
  }
}
