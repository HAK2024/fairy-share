'use client'

import Image from 'next/image'
import logo from '@public/images/logo/logo.png'
import { useAccount } from '@/(auth)/hooks'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // RouterLink,
  Input,
  Button,
} from '@/_components/ui'

const EditAccountForm = () => {
  const { form, onSubmit, isPending } = useAccount()

  return (
    <div className='items-cente flex w-full flex-col'>
      <Image src={logo} alt='Fairy Share logo' className='h-auto w-[200px]' />

      <div className='w-full md:max-w-[360px]'>
        <h1 className='mt-7 text-center text-3xl font-bold'>Edit account</h1>

        <Form {...form}>
          <form onSubmit={onSubmit} className='mx-auto mt-8 w-full'>
            <div className='space-y-5'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Your name' {...field} />
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
            </div>

            <div className='mt-7 text-center'>
              <Button
                type='submit'
                className='min-w-[98px]'
                isLoading={isPending}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { EditAccountForm }
