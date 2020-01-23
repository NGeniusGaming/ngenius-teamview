import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitchDashboardComponent} from './twitch-dashboard.component';
import {LiveVideoComponent} from '../live-video/live-video.component';
import {MatCardModule, MatGridListModule} from '@angular/material';

describe('TwitchDashboardComponent', () => {
  let component: TwitchDashboardComponent;
  let fixture: ComponentFixture<TwitchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatGridListModule],
      declarations: [TwitchDashboardComponent, LiveVideoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when setting video cards on the dashboard', () => {

    it('should make the first card on a desktop 3cols x 2rows', () => {
      const result = component.setCardAndVideoSize('channel', 0, false);
      expect(result.cols).toBe(3);
      expect(result.rows).toBe(2);
    });

    it('should make the second card and beyond on a desktop 1cols x 1rows', () => {
      const result = component.setCardAndVideoSize('channel', 1, false);
      expect(result.cols).toBe(1);
      expect(result.rows).toBe(1);
    });

    it('should make the first card on a phone 3cols x 1rows', () => {
      const result = component.setCardAndVideoSize('channel', 0, true);
      expect(result.cols).toBe(3);
      expect(result.rows).toBe(1);
    });

    it('should make the second card and beyond on a phone 3cols x 1rows', () => {
      const result = component.setCardAndVideoSize('channel', 1, true);
      expect(result.cols).toBe(3);
      expect(result.rows).toBe(1);
    });

    it('should not manipulate the channel name', () => {
      const result = component.setCardAndVideoSize('channel', 0, false);
      expect(result.channel).toBe('channel');
    });

  });
});
