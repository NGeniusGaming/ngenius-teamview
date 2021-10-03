import {of} from 'rxjs';
import {Configuration} from '../../config/configuration.model';
import ConfigurationJson from '../../../assets/configuration/config.json';

describe('ConfigurationMock', () => {
  it('should have a no-op test?', () => {});
});

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
      id: '255716703',
      displayName: 'NGeniusGaming',
      platform: 'twitch',
      tabs: ['team-view']
    },
    {
      id: '29519871',
      displayName: 'wellbornsteak',
      platform: 'twitch',
      tabs: ['tournament']
    }
  ]
} as Configuration;

// tslint:disable-next-line:variable-name
export const MockConfigurationService = {
  configuration: jest.fn(() => of(configuration))
};
