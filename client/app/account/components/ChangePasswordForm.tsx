import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  PasswordInput,
} from '@/_components/ui'
import { useChangePassword } from '../hooks'

const ChangePasswordForm = () => {
  const { form, onSubmit, isPending } = useChangePassword()

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='mx-auto mt-8 w-full'>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>
                  Current Password
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder='Current Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='New Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmNewPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Confirm New Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-7 text-center'>
          <Button type='submit' className='min-w-[98px]' isLoading={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { ChangePasswordForm }
