type User = {
  id: number
  name: string
  icon: string
}

type Payment = {
  id: number
  fee: number
  paidDate: string | null
  user: User
}

type Expense = {
  id: number
  itemName: string
  fee: number
  date: string
  houseId: number
  buyerId: number
  payments: Payment[]
  user: User
}

export { type User, type Payment, type Expense }
