import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideoComponent } from './live-video.component';
import {MatCardModule} from '@angular/material';

describe('LiveVideoComponent', () => {
  let component: LiveVideoComponent;
  let fixture: ComponentFixture<LiveVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ LiveVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
