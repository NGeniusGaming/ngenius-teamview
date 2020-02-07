import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixerVideoComponent } from './mixer-video.component';

describe('MixerVideoComponent', () => {
  let component: MixerVideoComponent;
  let fixture: ComponentFixture<MixerVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixerVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixerVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
