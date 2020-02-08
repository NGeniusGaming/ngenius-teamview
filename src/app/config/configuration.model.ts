/**
 * The Tab type - known tabs for this application.
 */
export type Tab = 'team-view' | 'tournament';

/**
 * The configuration interface for the project.
 * Declaring it this way ensures that we have strong type-safety
 * between configuration usage and actual configuration.
 */
export interface Configuration {
  readonly root: RootConfiguration;
  readonly api: ApiConfiguration;
  readonly tabs: TabsConfiguration;
  readonly channels: ChannelConfiguration[];
}

export interface RootConfiguration {
  readonly applicationLogo: string;
  readonly applicationTitle: string;
  readonly externalWebsiteLink: string;
  readonly flags: ApplicationFlags;
}

export interface ApplicationFlags {
  readonly beta: boolean;
}

export interface ApiConfiguration {
  readonly twitch: TwitchApiConfiguration;
}

export interface TwitchApiConfiguration {
  readonly clientId: string;
}

export interface TabsConfiguration {
  readonly ['team-view']: TabConfiguration;
  readonly tournament: TabConfiguration;
}

export interface TabConfiguration {
  readonly display: boolean;
}

export interface ChannelConfiguration {
  readonly id: string;
  readonly platform: string;
  readonly rank: string | null;
  readonly tabs: string[];
}
