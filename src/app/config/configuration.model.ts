/**
 * The configuration interface for the project.
 * Declaring it this way ensures that we have strong type-safety
 * between configuration usage and actual configuration.
 */

export interface Configuration {
  readonly root: RootConfiguration;
  readonly twitch: TwitchServiceConfiguration;
  readonly tournament: TournamentConfiguration;
}

export interface RootConfiguration {
  readonly applicationLogo: string;
  readonly applicationTitle: string;
  readonly externalWebsiteLink: string;
}

/**
 * Additional twitch specific configurations beyond the {BaseServiceConfiguration}
 */
export interface TwitchServiceConfiguration extends BaseServiceConfiguration {
  readonly api: TwitchApiConfiguration;
}

export interface TwitchApiConfiguration {
  readonly channels: string[];
  readonly clientId: string;
}

export interface TournamentConfiguration extends BaseServiceConfiguration {
  readonly twitch: TwitchApiConfiguration;
  readonly mixer: MixerApiConfiguration;
}

export interface MixerApiConfiguration {
  readonly channels: string[];
}

/**
 * The base configuration interface for common properties between various service providers.
 */
export interface BaseServiceConfiguration {
  readonly display: boolean;
}
