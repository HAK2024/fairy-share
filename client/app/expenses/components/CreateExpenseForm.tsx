import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  DateField,
} from '@/_components/ui'
import { useCreateExpense } from '../hooks/useCreateExpense'
import { ExpenseSchema } from '../schema'

const CreateExpenseForm = () => {
  const { form, onSubmit, isPending } = useCreateExpense()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='mt-8 md:mt-10' noValidate>
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
                <FormLabel isRequired>Expense&nbsp;($)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='0.00'
                    min='0.01'
                    step='0.01'
                    {...field}
                    value={field.value === 0 ? '' : field.value}
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
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreateExpenseForm }
