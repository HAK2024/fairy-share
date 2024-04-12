import { Expense } from './expenseType'

type DailyExpense = {
  date: string
  expenses: Expense[]
}

type UserExpense = {
  id: number
  name: string
  icon: string
  expenses: DailyExpense[]
}

type Payee = {
  payeeId: number
  fee: number
  payeeName: string
  payeeIcon: string
  paidDate: string | null
}

type BalanceSummary = {
  payerId: number
  payerName: string
  payerIcon: string
  payees: Payee[]
}

type ExpenseMonthPerMonthData = {
  month: string
  monthNumber: number
  year: number
  usersExpenses: UserExpense[]
  balanceSummary: BalanceSummary[]
}

type ExpenseMonthDataArray = ExpenseMonthPerMonthData[]

export {
  type DailyExpense,
  type UserExpense,
  type Payee,
  type BalanceSummary,
  type ExpenseMonthPerMonthData,
  type ExpenseMonthDataArray,
}
