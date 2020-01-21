import {TestBed} from '@angular/core/testing';

import {ConfigurationService} from './configuration.service';
import {first} from 'rxjs/operators';

describe('ConfigurationService', () => {

  let service: ConfigurationService;

  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have Twitch configuration', function(done) {
      service.configuration().pipe(first()).subscribe(result => {
        expect(result.twitch).toBeTruthy();
        done();
      });
  });
});
