import {Component, Inject, Input, OnInit} from '@angular/core';
import {TwitchAggregate} from '../api/twitch-aggregate-response.model';
import {DomSanitizer} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-twitch-user-card',
  templateUrl: './twitch-user-card.component.html',
  styleUrls: ['./twitch-user-card.component.scss']
})
export class TwitchUserCardComponent implements OnInit {

  @Input()
  public details: TwitchAggregate;

  constructor(
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
  }

}
