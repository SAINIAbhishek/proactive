export enum ViewModeEnum {
  GRID = 'grid',
  LIST = 'list',
}

export type ViewModeType = `${ViewModeEnum}`

export interface ViewModeOption {
  mode: ViewModeType
  label: string
  icon: string
}
