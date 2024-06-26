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
import { TaskType } from '@/_types'
import { AssigneeField } from '../components'
import { useUpdateTask } from '../hooks'
import { taskSchema } from '../schema'

const EditTaskForm = ({ defaultData }: { defaultData: TaskType }) => {
  const { form, onSubmit: onUpdateTask, isPending } = useUpdateTask(defaultData)

  const { data: house } = useGetHouseQuery()
  const houseMembers = house?.houseMembers || []

  return (
    <Form {...form}>
      <form onSubmit={onUpdateTask} className='mx-auto mt-8 w-full'>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter task title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DateField<taskSchema>
            control={form.control}
            name='date'
            placeholder='Pick a date'
            disabledDates='past'
          />
          <AssigneeField<taskSchema>
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
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { EditTaskForm }
