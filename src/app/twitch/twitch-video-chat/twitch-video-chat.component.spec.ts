import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchVideoChatComponent } from './twitch-video-chat.component';

describe('TwitchVideoChatComponent', () => {
  let component: TwitchVideoChatComponent;
  let fixture: ComponentFixture<TwitchVideoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchVideoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchVideoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
