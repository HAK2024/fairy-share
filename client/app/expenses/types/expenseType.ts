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

type Buyer = {
  buyerId: string
  expenses: Expense[]
}

type ExpenseDate = {
  date: string
  buyers: Buyer[]
}

type ExpenseMonthData = {
  month: string
  expenses: ExpenseDate[]
}

type ExpensesData = ExpenseMonthData[]

export {
  type User,
  type Payment,
  type Expense,
  type Buyer,
  type ExpenseDate,
  type ExpenseMonthData,
  type ExpensesData,
}
