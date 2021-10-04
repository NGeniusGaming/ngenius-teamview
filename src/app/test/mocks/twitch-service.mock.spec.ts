import {of} from 'rxjs';
import {TeamViewDashboardService} from '../../team-view/team-view-dashboard.service';
import {TournamentDashboardTwitchService} from '../../tournament/tournament-dashboard/tournament-dashboard-twitch.service';
import createSpyObj = jasmine.createSpyObj;

describe('TwitchServiceMock', () => {
  it('should have a no-op test?', () => {});
});
// tslint:disable-next-line:variable-name
export const MockTwitchDashboardService: Partial<TeamViewDashboardService> = {
  showingOfflineStreams: jest.fn(() => of(true))
};

// tslint:disable-next-line:variable-name
export const MockTournamentDashboardTwitchService: Partial<TournamentDashboardTwitchService> = {
  twitchAggregation: jest.fn(() => of([]))
};
