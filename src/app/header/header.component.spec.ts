import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MatToolbarModule, MatTooltipModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfigurationService} from '../config/configuration.service';
import {Configuration} from '../config/configuration.model';
import {first} from 'rxjs/operators';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let configuration: Configuration;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTooltipModule, MatToolbarModule, RouterTestingModule],
      declarations: [HeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.debugElement.injector.get(ConfigurationService)
      .configuration()
      .pipe(first())
      .subscribe(value => configuration = value);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Twitch button', () => {
    const twitchButton = fixture.debugElement.nativeElement.querySelector('#twitch-header-btn');
    expect(twitchButton).toBeTruthy('Expected the Twitch button to be visible by id: [twitch-header-btn] but it was not!');
  });

  it('should have ngenius gaming as the title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#application-title').innerText;
    expect(title).toBe(configuration.root.applicationTitle);
  });

  it('should have loaded the image for the logo', () => {
    const image = fixture.debugElement.nativeElement.querySelector('#application-logo').innerHTML;
    const imageHtml = new DOMParser().parseFromString(image, 'text/html');
    const src = imageHtml.body.firstElementChild.attributes.getNamedItem('src').value;
    expect(src).toBe(configuration.root.applicationLogo);
  });
});
