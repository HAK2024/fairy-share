'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import logo from '@public/images/logo/logo.png'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RouterLink,
  Input,
  Button,
  PasswordInput,
} from '@/_components/ui'
import { INVITED_HOUSE_ID } from '@/_consts'
import { useLogin, useRegister } from '../hooks'

const RegisterForm = () => {
  const searchParams = useSearchParams()
  const invitedHouseId = searchParams.get(INVITED_HOUSE_ID)

  const { form, onSubmit, isPending: isRegisterPending } = useRegister()
  const { googleLogin, isPending: isGoogleLoginPending } = useLogin()

  const isPending = isRegisterPending || isGoogleLoginPending

  return (
    <div className='flex w-full flex-col items-center bg-amber-50 md:w-[680px] md:p-10'>
      <Image src={logo} alt='Fairy Share logo' className='h-auto w-[200px]' />

      <div className='w-full md:max-w-[360px]'>
        <h1 className='mt-7 text-center text-3xl font-bold'>
          Create your account
        </h1>

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

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='password' {...field} />
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

        <div className='mt-7 flex items-center'>
          <div className='h-[1px] flex-grow bg-slate-300' />
          <span className='px-3 text-slate-600'>or</span>
          <div className='h-[1px] flex-grow bg-slate-300' />
        </div>
        <div className='mt-7 text-center'>
          <Button
            variant='secondaryOutline'
            className='min-w-[240px] text-base'
            onClick={() => googleLogin()}
            isLoading={isPending}
          >
            <FcGoogle className='mr-2' size={20} />
            Continue with Google
          </Button>
        </div>

        <div className='mt-10 flex flex-col items-center gap-2'>
          <span className='text-sm md:text-base'>Already have an account?</span>
          <RouterLink
            href={`/login${invitedHouseId ? `?${INVITED_HOUSE_ID}=${invitedHouseId}` : ''}`}
            className='text-sm'
          >
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  )
}

export { RegisterForm }
