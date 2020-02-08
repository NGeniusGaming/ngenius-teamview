import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchCustomVideoChatComponent } from './twitch-custom-video-chat.component';
import {MatCardModule} from '@angular/material';

describe('TwitchCustomVideoChatComponent', () => {
  let component: TwitchCustomVideoChatComponent;
  let fixture: ComponentFixture<TwitchCustomVideoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ TwitchCustomVideoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchCustomVideoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
