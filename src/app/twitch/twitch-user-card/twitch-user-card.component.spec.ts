import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchUserCardComponent } from './twitch-user-card.component';

describe('TwitchUserCardComponent', () => {
  let component: TwitchUserCardComponent;
  let fixture: ComponentFixture<TwitchUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
