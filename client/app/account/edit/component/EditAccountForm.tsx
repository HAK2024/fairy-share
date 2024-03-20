import { MdAccountCircle } from 'react-icons/md'
import { useAccountEdit } from '@/(auth)/hooks/useAccountEdit'
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

  console.log('watch', iconWatch)

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='mx-auto mt-8 w-full'>
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='icon'
            render={() => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <>
                    <MdAccountCircle
                      className={`text-4xl ${colorMap[user.icon as keyof typeof colorMap]}`}
                      size={52}
                    />
                    <div className='flex gap-4'>
                      {colorArray.map((colorValue) => {
                        return (
                          <FormItem
                            className='flex items-center space-x-2 space-y-0'
                            key={colorValue.value}
                          >
                            <FormLabel
                              className={`cursor-pointer rounded-full border border-primary ring-offset-background ${iconWatch === colorValue.value && 'ring-2 ring-ring ring-offset-2 '}`}
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
                  </>
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
          <Button type='submit' className='min-w-[98px]' isLoading={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { EditAccountForm }
