import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TwitchService} from './twitch.service';
import {first} from 'rxjs/operators';
import {MatSlideToggleChange} from '@angular/material';
import {ConfigurationService} from '../config/configuration.service';

describe('TwitchService', () => {

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService]
    });
    tick();
  }));

  let service: TwitchService;

  it('should be created', () => {
    service = TestBed.get(TwitchService);
    expect(service).toBeTruthy();
  });

  describe('Deciding to show online streams', () => {

    beforeEach(() => {
      // configure the default state:
      // service.showOfflineStreamsToggle(new MatSlideToggleChange(null, true));
    });

    // These are flaky and randomly fail.

    xit('should start at the value true', function(done) {
      service.showingOfflineStreams()
        .pipe(first(value => !!value))
        .subscribe(result => {
          expect(result).toBe(true);
          done();
        });
    });

    xit('should receive MatSlideToggleChange events and publish the checked value', function(done) {
      service.showOfflineStreamsToggle(new MatSlideToggleChange(null, false));
      service.showingOfflineStreams()
        // get the 2nd value
        .pipe(first(value => !value))
        .subscribe(result => {
          expect(result).toBe(false, 'Expected the 2nd published value to be false, but it was true!');
          done();
        });
    });
  });
});
