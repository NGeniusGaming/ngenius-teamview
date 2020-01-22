import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchDashboardComponent } from './twitch-dashboard.component';

describe('TwitchDashboardComponent', () => {
  let component: TwitchDashboardComponent;
  let fixture: ComponentFixture<TwitchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchDashboardComponent ]
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
