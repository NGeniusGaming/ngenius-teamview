export interface TwitchUser {
  readonly id: string;
  readonly broadcaster_type: string;
  readonly description: string;
  readonly display_name: string;
  readonly login: string;
  readonly offline_image_url: string;
  readonly profile_image_url: string;
  readonly type: string;
  readonly view_count: number;
  readonly created_at: string;
}
