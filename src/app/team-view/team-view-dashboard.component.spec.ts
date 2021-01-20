import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TeamViewDashboardComponent} from './team-view-dashboard.component';
import {TwitchVideoChatComponent} from '../twitch/twitch-custom-video-chat/twitch-video-chat.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TwitchDashboardComponent', () => {
  let component: TeamViewDashboardComponent;
  let fixture: ComponentFixture<TeamViewDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatGridListModule, MatIconModule, HttpClientTestingModule],
      declarations: [TeamViewDashboardComponent, TwitchVideoChatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when setting video cards on the dashboard', () => {

    it('should make the first card on a desktop 6cols x 4rows', () => {
      const result = component.cardSize(0);
      expect(result.cols).toBe(6);
      expect(result.rows).toBe(4);
    });

    it('should make the second card and beyond on a desktop 2cols x 2rows', () => {
      const result = component.cardSize(1);
      expect(result.cols).toBe(2);
      expect(result.rows).toBe(2);
    });

    // Will need to figure out how to mock breakpoints to test now...
    xit('should make the first card on a phone 6cols x 2rows', () => {
      const result = component.cardSize(0);
      expect(result.cols).toBe(6);
      expect(result.rows).toBe(2);
    });

    // Will need to figure out how to mock breakpoints to test now...
    xit('should make the second card and beyond on a phone 6cols x 2rows', () => {
      const result = component.cardSize(1);
      expect(result.cols).toBe(6);
      expect(result.rows).toBe(2);
    });
  });
});
