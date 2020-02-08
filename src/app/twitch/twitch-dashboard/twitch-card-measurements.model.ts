export type Column = 1 | 2 | 3 | 4 | 5 | 6;
export type Row = 1 | 2 | 3 | 4;

export interface TeamViewCardMeasurements {
  readonly channel: string;
  readonly cols: Column;
  readonly rows: Row;
}
