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
import { HouseType } from '@/_types'
import { DynamicRuleField } from './DynamicRuleField'
import { useUpdateHouse } from '../hooks'

type HouseUpdateFormProps = {
  defaultData: HouseType
}

const HouseUpdateForm = ({ defaultData }: HouseUpdateFormProps) => {
  const { form, onSubmit, isPending } = useUpdateHouse(defaultData)

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

          <DynamicRuleField defaultData={defaultData} />

          <FormField
            control={form.control}
            name='isExpensePerTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Expenses Tracking</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className='flex flex-col'
                    defaultValue={
                      defaultData.isExpensePerTime ? 'eachTime' : 'monthly'
                    }
                  >
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='eachTime' />
                      </FormControl>
                      <FormLabel>
                        Divide the expense per person each time?
                      </FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-2  space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='monthly' />
                      </FormControl>
                      <FormLabel>
                        Divide the expense per person monthly?
                      </FormLabel>
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
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { HouseUpdateForm }
