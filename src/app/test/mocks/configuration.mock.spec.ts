import {of} from 'rxjs';
import {Configuration} from '../../config/configuration.model';
import ConfigurationJson from '../../../assets/configuration/config.json';

const configuration = {
  ...ConfigurationJson,
  tabs: {
    'team-view': {
      display: true
    },
    tournament: {
      display: true
    }
  },
  channels: [
    {
      displayName: 'NGeniusGaming',
      platform: 'twitch',
      tabs: ['team-view']
    },
    {
      displayName: 'wellbornsteak',
      platform: 'twitch',
      tabs: ['tournament']
    }
  ]
} as Configuration;

// tslint:disable-next-line:variable-name
export const MockConfigurationService = {
  configuration: jasmine.createSpy('configuration').and.returnValue(of(configuration))
};
