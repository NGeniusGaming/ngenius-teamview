import {ComponentFixture, fakeAsync, TestBed, waitForAsync} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../config/configuration.service';
import {Configuration} from '../config/configuration.model';
import {TeamViewDashboardService} from '../team-view/team-view-dashboard.service';
import {MockTwitchDashboardService} from '../test/mocks/twitch-service.mock.spec';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {MockConfigurationService} from '../test/mocks/configuration.mock.spec';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let configuration: Configuration;

  const breakpoint = (matches: boolean): Observable<BreakpointState> => of({matches, breakpoints: {}});

  const breakpointObserver = {
    observe: jest.fn( () =>  breakpoint(false))
  };

  beforeEach(waitForAsync(() => {
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
        {provide: BreakpointObserver, useValue: breakpointObserver},
        {provide: ConfigurationService, useValue: MockConfigurationService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.inject(ConfigurationService)
      .configuration()
      .subscribe(v => configuration = v);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buttons on the header in desktop mode', () => {

    it('should show the Twitch button', () => {
      const twitchButton = fixture.debugElement.nativeElement.querySelector('#twitch-header-btn');
      expect(twitchButton).toBeTruthy();
    });
  });

  it('should have ngenius gaming as the title', () => {
    const title = fixture.nativeElement.querySelector('#application-title').textContent.trim();
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
