import { Expense } from './expenseType'

type Buyer = {
  buyerId: string
  expenses: Expense[]
}

type ExpenseDate = {
  date: string
  buyers: Buyer[]
}

type ExpenseMonthPerDateData = {
  month: string
  expenses: ExpenseDate[]
}

type ExpensesData = ExpenseMonthPerDateData[]

export {
  type Buyer,
  type ExpenseDate,
  type ExpenseMonthPerDateData,
  type ExpensesData,
}
