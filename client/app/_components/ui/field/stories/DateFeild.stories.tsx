import { useForm } from 'react-hook-form'
import { FormContainer } from '@/_components/layout'
import { taskSchema } from '@/tasks/schema'
import { Form } from '../..'
import { DateField, DateFieldProps } from '../DateField'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'ui/DateField',
  component: DateField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateField>

export default meta

export const Default: StoryObj<DateFieldProps<taskSchema>> = {
  render: (args) => {
    const form = useForm<taskSchema>()
    return (
      <FormContainer>
        <Form {...form}>
          <form className='mx-auto mt-8 w-full'>
            <DateField {...args} control={form.control} type='task' />
          </form>
        </Form>
      </FormContainer>
    )
  },
  args: {
    name: 'date',
    type: 'task',
  },
}
