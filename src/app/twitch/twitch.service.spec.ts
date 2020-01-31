import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {REFRESH_MINUTES, TwitchService} from './twitch.service';
import {first} from 'rxjs/operators';
import {MatSlideToggleChange} from '@angular/material';
import {ConfigurationService} from '../config/configuration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TwitchService', () => {

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService],
      imports: [HttpClientTestingModule]
    });
    tick();
  }));

  let service: TwitchService;

  it('should be created', () => {
    service = TestBed.get(TwitchService);
    expect(service).toBeTruthy();
  });

  describe('when refreshing twitch data', () => {
    let httpMock: HttpTestingController;
    beforeEach(() => {
      httpMock = TestBed.get(HttpTestingController);
    });

    // this test doesn't work at all.
    xit('should refresh twitch data periodically', fakeAsync(() => {
      service.channels().pipe(first()).subscribe(result => expect(result).toBeTruthy());
      const mockRequest = httpMock.expectOne(req => req.url.startsWith(''));
      tick(REFRESH_MINUTES * 1.5 * 1000 * 60);

      expect(mockRequest.cancelled).toBeFalsy();

      mockRequest.flush({data: [], pagination: {cursor: ''}});

      tick(50000);
      httpMock.verify();
    }));

  });
});
