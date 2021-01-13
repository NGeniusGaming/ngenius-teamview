import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { TournamentDashboardComponent } from './tournament-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import {TwitchVideoChatComponent} from '../../twitch/twitch-custom-video-chat/twitch-video-chat.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockTournamentDashboardTwitchService} from '../../test/mocks/twitch-service.mock.spec';
import {TournamentDashboardTwitchService} from './tournament-dashboard-twitch.service';

describe('TournamentDashboardComponent', () => {
  let component: TournamentDashboardComponent;
  let fixture: ComponentFixture<TournamentDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentDashboardComponent, TwitchVideoChatComponent ],
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
