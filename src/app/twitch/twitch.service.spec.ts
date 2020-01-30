import {TestBed} from '@angular/core/testing';

import {TwitchService} from './twitch.service';
import {first} from 'rxjs/operators';
import {MatSlideToggleChange} from '@angular/material';

describe('TwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service: TwitchService;

  it('should be created', () => {
    service = TestBed.get(TwitchService);
    expect(service).toBeTruthy();
  });

  describe('Deciding to show online streams', () => {

    it('should start at the value true', function(done) {
      service.showingOfflineStreams()
        .pipe(first())
        .subscribe(result => {
          expect(result).toBeTruthy();
          done();
        });
    });

    it('should receive MatSlideToggleChange events and publish the checked value', function(done) {
      service.showingOfflineStreams()
        // get the 2nd value
        .pipe(first((value, index) => index === 1))
        .subscribe(result => {
          expect(result).toBeFalsy('Expected the 2nd published value to be false, but it was true!');
          done();
        });
      service.showOfflineStreamsToggle(new MatSlideToggleChange(null, false));
    });
  });
});
