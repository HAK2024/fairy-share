export type HouseApiType<T> = Omit<T, 'isExpensePerTime'> & {
  isExpensePerTime: boolean
}
