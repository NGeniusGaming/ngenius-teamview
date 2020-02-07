import {of} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import {TwitchDashboardService} from '../../twitch/twitch-dashboard/twitch-dashboard.service';
import {TournamentDashboardTwitchService} from '../../tournament/tournament-dashboard/tournament-dashboard-twitch.service';

// tslint:disable-next-line:variable-name
export const MockTwitchDashboardService: TwitchDashboardService = createSpyObj('TwitchDashboardService', {
  showingOfflineStreams: of(true)
});

// tslint:disable-next-line:variable-name
export const MockTournamentDashboardTwitchService: TournamentDashboardTwitchService =
  createSpyObj('TournamentDashboardTwitchService', {
    channels: of(['mixer'])
  });
