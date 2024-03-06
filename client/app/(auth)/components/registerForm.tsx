'use client'

import Image from 'next/image'
import { Button } from '@/_components/ui'
import { Input } from '@/_components/ui'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/_components/ui'
import { useRegister } from '../hooks'

const RegisterForm = () => {
  const { form, onSubmit } = useRegister()

  console.log('errors', form.formState.errors)

  return (
    <div className='flex flex-col items-center bg-amber-50 p-10 md:w-[680px]'>
      <Image
        src='/images/logo/logo.png'
        width={200}
        height={40}
        alt='Fairy Share logo'
      />
      <h1 className='mt-7 text-3xl font-bold'>Create your account</h1>

      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className='mx-auto mt-8 w-full max-w-80 space-y-5'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='You name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='example@gmail.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-center'>
            <Button type='submit'>Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { RegisterForm }
