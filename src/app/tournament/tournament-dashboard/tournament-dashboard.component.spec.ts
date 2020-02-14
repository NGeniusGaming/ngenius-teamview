import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDashboardComponent } from './tournament-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {TwitchVideoChatComponent} from '../../twitch/twitch-video-chat/twitch-video-chat.component';
import {MixerVideoComponent} from '../../mixer/mixer-video/mixer-video.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockTournamentDashboardTwitchService} from '../../test/mocks/twitch-service.mock.spec';
import {TournamentDashboardTwitchService} from './tournament-dashboard-twitch.service';

describe('TournamentDashboardComponent', () => {
  let component: TournamentDashboardComponent;
  let fixture: ComponentFixture<TournamentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentDashboardComponent, TwitchVideoChatComponent, MixerVideoComponent ],
      imports: [MatGridListModule, MatCardModule, HttpClientTestingModule],
      providers: [
        {provide: TournamentDashboardTwitchService , useValue: MockTournamentDashboardTwitchService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
