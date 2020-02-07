import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchVideoOnlyComponent } from './twitch-video-only.component';
import {MatCardModule} from '@angular/material';

describe('TwitchVideoOnlyComponent', () => {
  let component: TwitchVideoOnlyComponent;
  let fixture: ComponentFixture<TwitchVideoOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ TwitchVideoOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchVideoOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
