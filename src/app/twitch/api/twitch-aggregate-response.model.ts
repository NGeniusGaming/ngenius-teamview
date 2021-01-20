import {TwitchUser} from './twitch-user.model';
import {TwitchStream} from './twitch-streams.model';

export interface TwitchAggregate {
  readonly live: boolean;
  readonly user: TwitchUser;
  readonly stream: TwitchStream;
  readonly index: number;
  readonly chatUrl: string;
  readonly videoUrl: string;
}
