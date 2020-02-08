import {of} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import {TeamViewDashboardService} from '../../twitch/twitch-dashboard/team-view-dashboard.service';
import {TournamentDashboardTwitchService} from '../../tournament/tournament-dashboard/tournament-dashboard-twitch.service';

// tslint:disable-next-line:variable-name
export const MockTwitchDashboardService: TeamViewDashboardService = createSpyObj('TwitchDashboardService', {
  showingOfflineStreams: of(true)
});

// tslint:disable-next-line:variable-name
export const MockTournamentDashboardTwitchService: TournamentDashboardTwitchService =
  createSpyObj('TournamentDashboardTwitchService', {
    channels: of(['mixer'])
  });
