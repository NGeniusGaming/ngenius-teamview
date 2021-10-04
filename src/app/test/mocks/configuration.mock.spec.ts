import {of} from 'rxjs';
import {Configuration} from '../../config/configuration.model';
import ConfigurationJson from '../../../assets/configuration/config.json';

describe('ConfigurationMock', () => {
  it('should have a no-op test?', () => {});
});

const configuration = {
  root: {
    applicationLogo: 'assets/ngen.png',
    applicationTitle: 'NGenius Gaming Team View',
    externalWebsiteLink: 'https://www.ngeniusgaming.com/',
    apiUrl: 'https://api.ngeniusgaming.us/',
    flags: {
      beta: true
    }
  },
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
