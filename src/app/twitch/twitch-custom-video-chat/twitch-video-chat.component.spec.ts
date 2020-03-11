import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchVideoChatComponent } from './twitch-video-chat.component';
import { MatCardModule } from '@angular/material/card';

describe('TwitchCustomVideoChatComponent', () => {
  let component: TwitchVideoChatComponent;
  let fixture: ComponentFixture<TwitchVideoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ TwitchVideoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchVideoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
