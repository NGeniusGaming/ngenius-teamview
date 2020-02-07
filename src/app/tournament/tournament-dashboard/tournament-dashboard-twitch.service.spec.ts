import { TestBed } from '@angular/core/testing';

import { TournamentDashboardTwitchService } from './tournament-dashboard-twitch.service';

describe('TournamentDashboardTwitchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentDashboardTwitchService = TestBed.get(TournamentDashboardTwitchService);
    expect(service).toBeTruthy();
  });
});
