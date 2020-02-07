import { TestBed } from '@angular/core/testing';

import { TournamentDashboardMixerService } from './tournament-dashboard-mixer.service';

describe('TournamentDashboardMixerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentDashboardMixerService = TestBed.get(TournamentDashboardMixerService);
    expect(service).toBeTruthy();
  });
});
