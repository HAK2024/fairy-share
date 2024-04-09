import React from 'react'
import {
  Button,
  DateField,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/_components/ui'
import { ExpenseType } from '@/_types'
import { useUpdateExpense } from '../hooks'
import { ExpenseSchema } from '../schema'

const EditExpenseForm = ({ defaultData }: { defaultData: ExpenseType }) => {
  const {
    form,
    onSubmit: onUpdateExpense,
    isPending,
  } = useUpdateExpense(defaultData)

  return (
    <Form {...form}>
      <form onSubmit={onUpdateExpense} className='mt-8 md:mt-10' noValidate>
        <div className='space-y-6 md:space-y-8'>
          <FormField
            control={form.control}
            name='itemName'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder='Detergent' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fee'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Expenses&nbsp;($)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='0.00'
                    min='0.01'
                    step='0.01'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DateField<ExpenseSchema>
            control={form.control}
            name='date'
            placeholder='Purchase date'
            disabledDates='future'
          />
        </div>

        <div className='mt-8 text-center md:mt-10'>
          <Button type='submit' isLoading={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { EditExpenseForm }