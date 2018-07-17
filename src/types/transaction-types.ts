export enum ListDataStatus {
  success = 1,
  pending,
}

export interface ListData {
  order_no: string
  timestamp: number
  username: string
  price: number
  status: ListDataStatus
}