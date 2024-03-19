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
import { Textarea } from '@/_components/ui/Textarea'
import { useGetHouseQuery } from '@/_hooks/api'
import { AssigneeField } from '../components'
import { useCreateTask } from '../hooks'
import { TaskFormType } from '../types'

const CreateTaskForm = () => {
  const { form, onSubmit: onCreateTask, isPending } = useCreateTask()

  const { data: house } = useGetHouseQuery()
  const houseMembers = house?.houseMembers || []
  return (
    <Form {...form}>
      <form onSubmit={onCreateTask} className='mx-auto mt-8 w-full'>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className='text-destructive'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Enter task title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DateField<TaskFormType> control={form.control} name='date' />
          <AssigneeField<TaskFormType>
            control={form.control}
            name='assigneeId'
            houseMembers={houseMembers}
          />
          <FormField
            control={form.control}
            name='note'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea className='bg-slate-50' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='mt-10 text-center'>
          <Button type='submit' isLoading={isPending}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreateTaskForm }
