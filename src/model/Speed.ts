export type SpeedType = "speed" | "boost";

export interface Speed {
  position: number;
  value: number;
  type: SpeedType;
}
