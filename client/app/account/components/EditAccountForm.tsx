import { MdAccountCircle } from 'react-icons/md'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@/_components/ui'
import { colorMap } from '@/_consts'
import { UserType } from '@/_types'
import { useAccountEdit } from '@/account/hooks'

type EditAccountFormProps = {
  user: UserType
}
const EditAccountForm = ({ user }: EditAccountFormProps) => {
  const { form, onSubmit, isPending } = useAccountEdit(user)

  const colorArray = Object.entries(colorMap).map((colorArray) => {
    return {
      value: colorArray[0],
      color: colorArray[1],
    }
  })

  const iconWatch = form.watch('icon')

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='mx-auto mt-8 w-full'>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='icon'
            render={() => (
              <FormItem>
                <FormControl>
                  <div className='flex'>
                    <div className='flex h-full columns-1 flex-col'>
                      <FormLabel className=' font-semibold'>Icon</FormLabel>
                      <MdAccountCircle
                        className={`mt-12 text-4xl ${colorMap[iconWatch as keyof typeof colorMap]}`}
                        size={52}
                      />
                    </div>
                    <div className='flex w-full columns-11 items-center justify-center'>
                      <div className='grid grid-cols-3 items-center justify-center gap-4'>
                        {colorArray.map((colorValue) => {
                          return (
                            <FormItem
                              className='flex items-center space-x-2 space-y-0'
                              key={colorValue.value}
                            >
                              <FormLabel
                                aria-label={`Select ${colorValue.value} color`}
                                className={`cursor-pointer rounded-full ring-offset-background ${iconWatch === colorValue.value && 'ring-2 ring-ring ring-offset-0'}`}
                                onClick={() =>
                                  form.setValue('icon', colorValue.value)
                                }
                              >
                                <MdAccountCircle
                                  className={`text-4xl ${colorValue.color}`}
                                  size={52}
                                />
                              </FormLabel>
                            </FormItem>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Name</FormLabel>
                <FormControl>
                  <Input
                    className='text-base'
                    placeholder='Your name'
                    {...field}
                  />
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
                <FormLabel className='font-semibold'>Email</FormLabel>
                <FormControl>
                  <Input
                    className='text-base'
                    placeholder='example@gmail.com'
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

export { EditAccountForm }
