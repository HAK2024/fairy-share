'use client'

import { useRouter } from 'next/navigation'
import { FiPlus } from 'react-icons/fi'
import { PageContainer } from '@/_components/layout'
import { Button, Heading } from '@/_components/ui'
import { useGetHouseInfo } from '@/_hooks'
import { ExpenseTrackingPerDate, ExpenseTrackingPerMonth } from './components'

export default function ExpensePage() {
  const router = useRouter()
  const isExpensePerTime = useGetHouseInfo().isExpensePerTime

  return (
    <PageContainer>
      <Heading
        title='Expense Tracking'
        buttonComponent={
          <Button
            variant={'outline'}
            onClick={() => router.push('/expenses/create')}
          >
            <FiPlus className='mr-1' />
            Add
          </Button>
        }
      />
      {isExpensePerTime ? (
        <ExpenseTrackingPerDate />
      ) : (
        <ExpenseTrackingPerMonth />
      )}
    </PageContainer>
  )
}
