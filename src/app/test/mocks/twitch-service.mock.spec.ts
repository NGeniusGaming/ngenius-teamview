import {of} from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import {TwitchService} from '../../twitch/twitch.service';

// tslint:disable-next-line:variable-name
export const MockTwitchService: TwitchService = createSpyObj('TwitchService', {
  showingOfflineStreams: of(true)
});
