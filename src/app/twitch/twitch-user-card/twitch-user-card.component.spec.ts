import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchUserCardComponent} from './twitch-user-card.component';
import {BehaviorSubject} from 'rxjs';
import {TwitchChannelInteractionFeedbackLoop} from './twitch-channel-interaction.model';

describe('TwitchUserCardComponent', () => {
  let component: TwitchUserCardComponent;
  let fixture: ComponentFixture<TwitchUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwitchUserCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchUserCardComponent);
    component = fixture.componentInstance;
    component.details = {
      live: false,
      stream: null,
      index: 0,
      user: {
        id: '1',
        broadcaster_type: 'affiliate',
        description: 'test',
        display_name: 'tester',
        login: 'tester',
        offline_image_url: 'https://offline.image',
        profile_image_url: 'https://profile.image',
        type: 'streamer',
        view_count: 42,
        created_at: 'malformed-date-time'
      },
      chatUrl: 'https://some.url',
      videoUrl: 'https://some.other.url'
    };
    component.feedbackLoop = new BehaviorSubject(new TwitchChannelInteractionFeedbackLoop([], []));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
