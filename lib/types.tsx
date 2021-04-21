export interface WordInterface {
  word: string
  mentions: { count: number; created_at: string }[]
}

export interface ChartDataInterface {
  name: string
  [x: string]: string | number
}
