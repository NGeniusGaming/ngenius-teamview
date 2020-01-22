import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchDashboardComponent } from './twitch-dashboard.component';
import {LiveVideoComponent} from '../live-video/live-video.component';
import {MatCardModule} from '@angular/material';

describe('TwitchDashboardComponent', () => {
  let component: TwitchDashboardComponent;
  let fixture: ComponentFixture<TwitchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ TwitchDashboardComponent, LiveVideoComponent ]
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
});
