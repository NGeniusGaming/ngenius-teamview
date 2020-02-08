import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamViewDashboard} from './team-view-dashboard.component';
import {TwitchVideoOnlyComponent} from '../twitch-video-only/twitch-video-only.component';
import {MatCardModule, MatGridListModule, MatIconModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TwitchVideoChatComponent} from '../twitch-video-chat/twitch-video-chat.component';

describe('TwitchDashboardComponent', () => {
  let component: TeamViewDashboard;
  let fixture: ComponentFixture<TeamViewDashboard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatGridListModule, MatIconModule, HttpClientTestingModule],
      declarations: [TeamViewDashboard, TwitchVideoOnlyComponent, TwitchVideoChatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when setting video cards on the dashboard', () => {

    it('should make the first card on a desktop 6cols x 4rows', () => {
      const result = component.setCardAndVideoSize('channel', 0, false);
      expect(result.cols).toBe(6);
      expect(result.rows).toBe(4);
    });

    it('should make the second card and beyond on a desktop 2cols x 2rows', () => {
      const result = component.setCardAndVideoSize('channel', 1, false);
      expect(result.cols).toBe(2);
      expect(result.rows).toBe(2);
    });

    it('should make the first card on a phone 6cols x 2rows', () => {
      const result = component.setCardAndVideoSize('channel', 0, true);
      expect(result.cols).toBe(6);
      expect(result.rows).toBe(2);
    });

    it('should make the second card and beyond on a phone 6cols x 2rows', () => {
      const result = component.setCardAndVideoSize('channel', 1, true);
      expect(result.cols).toBe(6);
      expect(result.rows).toBe(2);
    });

    it('should not manipulate the channel name', () => {
      const result = component.setCardAndVideoSize('channel', 0, false);
      expect(result.channel).toBe('channel');
    });

  });

  describe('when 2 channels are pinned to the top of the stream', () => {

    beforeEach(() => {
      component.pin('channel-one');
      component.pin('channel-two');
    });

    it('should make the first two channels a bit smaller (3x3) when 2 are pinned', () => {
      const result1 = component.setCardAndVideoSize('channel', 0, false);
      const result2 = component.setCardAndVideoSize('channel', 1, false);
      const result3 = component.setCardAndVideoSize('channel', 2, false);

      expect(result1.cols).toBe(3);
      expect(result1.rows).toBe(3);

      expect(result2.cols).toBe(3);
      expect(result2.rows).toBe(3);

      // beyond the first 2, we are back to smaller cards.
      expect(result3.cols).toBe(2);
      expect(result3.rows).toBe(2);
    });
  });
});
