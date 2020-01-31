export interface TwitchStreamsResponse {
  readonly data: TwitchStreamsInfo[];
  readonly pagination: PaginationInfo;
}

export interface TwitchStreamsInfo {
  readonly id: string;
  readonly user_id: string;
  readonly user_name: string;
  readonly game_id: string;
  readonly type: string;
  readonly title: string;
  readonly viewer_count: number;
  readonly started_at: string;
  readonly language: string;
  readonly thumbnail_url: string;
  readonly tag_ids: string[];
}

export interface PaginationInfo {
  readonly cursor: string;
}

export const EMPTY_TWITCH_STREAMS: TwitchStreamsResponse = {data: [], pagination: {cursor: ''}};
