import {TestBed} from '@angular/core/testing';

import {TournamentDashboardTwitchService} from './tournament-dashboard-twitch.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TournamentDashboardTwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TournamentDashboardTwitchService = TestBed.get(TournamentDashboardTwitchService);
    expect(service).toBeTruthy();
  });
});
