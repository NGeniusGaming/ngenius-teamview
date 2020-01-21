/**
 * The configuration interface for the project.
 * Declaring it this way ensures that we have strong type-safety
 * between configuration usage and actual configuration.
 */
export interface Configuration {
  readonly twitch: TwitchServiceConfiguration;
}

/**
 * Additional twitch specific configurations beyond the {BaseServiceConfiguration}
 */
export interface TwitchServiceConfiguration extends BaseServiceConfiguration {
  readonly users: string[];
}

/**
 * The base configuration interface for common properties between various service providers.
 */
export interface BaseServiceConfiguration {
  readonly display: boolean;
}
