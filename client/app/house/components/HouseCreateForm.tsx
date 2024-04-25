import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  RadioGroup,
  RadioGroupItem,
} from '@/_components/ui'
import { DynamicRuleField } from './DynamicRuleField'
import { useCreateHouse } from '../hooks'

const HouseCreateForm = () => {
  const { form, onSubmit, isPending } = useCreateHouse()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='mt-8 md:mt-10'>
        <div className='space-y-6 md:space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>House Name</FormLabel>
                <FormControl>
                  <Input placeholder='Vancouver House' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DynamicRuleField />

          <FormField
            control={form.control}
            name='isExpensePerTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Expense Tracking</FormLabel>
                <span className='text-xs font-medium'>
                  Divided equally between all members:
                </span>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='flex flex-col'
                    defaultValue='monthly'
                  >
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='eachTime' />
                      </FormControl>
                      <FormLabel>
                        End of the day after purchases are made
                      </FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-2  space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='monthly' />
                      </FormControl>
                      <FormLabel>Summed at the end of month</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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

export { HouseCreateForm }
