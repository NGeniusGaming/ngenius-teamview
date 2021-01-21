import {of} from 'rxjs';
import {TeamViewDashboardService} from '../../team-view/team-view-dashboard.service';
import {TournamentDashboardTwitchService} from '../../tournament/tournament-dashboard/tournament-dashboard-twitch.service';
import createSpyObj = jasmine.createSpyObj;

// tslint:disable-next-line:variable-name
export const MockTwitchDashboardService: TeamViewDashboardService = createSpyObj('TwitchDashboardService', {
  isShowingOfflineStreams: of(true)
});

// tslint:disable-next-line:variable-name
export const MockTournamentDashboardTwitchService: TournamentDashboardTwitchService =
  createSpyObj('TournamentDashboardTwitchService', {
    channels: of(['mixer'])
  });
