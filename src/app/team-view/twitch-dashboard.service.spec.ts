import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TeamViewDashboardService} from './team-view-dashboard.service';
import {first} from 'rxjs/operators';
import {ConfigurationService} from '../config/configuration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {REFRESH_MINUTES} from '../twitch/twitch-service.helper';

describe('TwitchService', () => {

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService],
      imports: [HttpClientTestingModule]
    });
    tick();
  }));

  let service: TeamViewDashboardService;

  it('should be created', () => {
    service = TestBed.inject(TeamViewDashboardService);
    expect(service).toBeTruthy();
  });

  describe('when refreshing twitch data', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      httpMock = TestBed.inject(HttpTestingController);
    });
  });
});
