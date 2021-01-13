import {TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ConfigurationService', () => {

  let service: ConfigurationService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.inject(ConfigurationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should query for configuration on boot', () => {
    httpMock.expectOne(request => request.url.endsWith('/v1/config') && request.method === 'GET',
      'Should make a GET request to /v1/config'
    );
    httpMock.verify();
  });
});
