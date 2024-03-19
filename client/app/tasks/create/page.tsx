'use client'

import React from 'react'
import { FormContainer, Loading } from '@/_components/layout'
import { Button, Form, Heading } from '@/_components/ui'
import { useGetHouseQuery } from '@/_hooks/api'
import { AssigneeField, DateField, NoteField, TitleField } from '../components'
import { useCreateTask } from '../hooks'
import { TaskFormType } from '../types'

export default function CreateTask() {
  const { form, onSubmit: onCreateTask, isPending } = useCreateTask()

  const { data: house, isLoading } = useGetHouseQuery()
  const houseMembers = house?.houseMembers || []

  if (isLoading) return <Loading />

  return (
    <FormContainer>
      <Heading title='Create Task' />
      <Form {...form}>
        <form onSubmit={onCreateTask} className='mx-auto mt-8 w-full'>
          <div className='space-y-5'>
            <TitleField<TaskFormType> control={form.control} name='title' />
            <DateField<TaskFormType> control={form.control} name='date' />
            <AssigneeField<TaskFormType>
              control={form.control}
              name='assigneeId'
              houseMembers={houseMembers}
            />
            <NoteField<TaskFormType> control={form.control} name='note' />
          </div>
          <div className='mt-10 text-center'>
            <Button type='submit' isLoading={isPending} disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  )
}
