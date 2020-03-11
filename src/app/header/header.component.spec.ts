import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../config/configuration.service';
import {Configuration} from '../config/configuration.model';
import {first} from 'rxjs/operators';
import {TeamViewDashboardService} from '../team-view/team-view-dashboard.service';
import {MockTwitchDashboardService} from '../test/mocks/twitch-service.mock.spec';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import Spy = jasmine.Spy;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let configuration: Configuration;

  const breakpoint = (matches: boolean): Observable<BreakpointState> => of({matches, breakpoints: {}});

  const breakpointObserver = {
    observe(): Observable<BreakpointState> {
      return breakpoint(false);
    }
  };
  let breakpointSpy: Spy;
  let observeSpy: Spy;

  beforeEach(() => {
    breakpointSpy = spyOn(breakpointObserver, 'observe');
    observeSpy = breakpointSpy.and.returnValue(breakpoint(false));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTooltipModule,
        MatToolbarModule,
        RouterTestingModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatIconModule,
        HttpClientTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        {provide: TeamViewDashboardService, useValue: MockTwitchDashboardService},
        {provide: BreakpointObserver, useValue: breakpointObserver}
      ]
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

  describe('buttons on the header in desktop mode', () => {
    beforeEach(() => {
      // TODO: I HATE ANGULAR TESTING........ STIL DOESN'T DO ANYTHING
      breakpointSpy.and.returnValue(breakpoint(false));
    });

    it('should show the Twitch button', () => {
      const twitchButton = fixture.debugElement.nativeElement.querySelector('#twitch-header-btn');
      expect(twitchButton).toBeTruthy('Expected the Twitch button to be visible by id: [twitch-header-btn] but it was not!');
    });
  });

  it('should have ngenius gaming as the title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('#application-title').innerText;
    const expectedTitle = configuration.root.flags.beta
      ? configuration.root.applicationTitle + ' BETA'
      : configuration.root.applicationTitle;
    expect(title).toBe(expectedTitle);
  });

  it('should have loaded the image for the logo', () => {
    const image = fixture.debugElement.nativeElement.querySelector('#application-logo').innerHTML;
    const imageHtml = new DOMParser().parseFromString(image, 'text/html');
    const src = imageHtml.body.firstElementChild.attributes.getNamedItem('src').value;
    expect(src).toBe(configuration.root.applicationLogo);
  });
});
