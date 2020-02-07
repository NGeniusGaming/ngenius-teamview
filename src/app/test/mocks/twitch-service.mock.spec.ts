import {of} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import {TwitchDashboardService} from '../../twitch/twitch-dashboard.service';

// tslint:disable-next-line:variable-name
export const MockTwitchService: TwitchDashboardService = createSpyObj('TwitchService', {
  showingOfflineStreams: of(true)
});
