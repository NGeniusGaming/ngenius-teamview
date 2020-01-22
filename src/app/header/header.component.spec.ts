import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {MatToolbarModule, MatTooltipModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTooltipModule, MatToolbarModule, RouterTestingModule],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Twitch button', () => {
    const twitchButton = fixture.debugElement.nativeElement.querySelector('#twitch-header-btn');
    expect(twitchButton).toBeTruthy('Expected the Twitch button to be visible by id: [twitch-header-btn] but it was not!');
  });

  it('should have ngenius gaming as the title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#application-title').innerText;
    expect(title).toBe('NGenius Gaming');
  });

  it('should have loaded an image for the logo', () => {
    const image = fixture.debugElement.nativeElement.querySelector('#application-logo').innerHTML;
    expect(image.indexOf('.png')).toBeGreaterThan(0);
  });
});
