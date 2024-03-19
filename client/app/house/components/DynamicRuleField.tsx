import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@/_components/ui'
import { CreateHouseSchema } from '../schema'

const DynamicRuleField = () => {
  const { control } = useFormContext<CreateHouseSchema>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rules',
  })

  const value = useWatch({
    name: 'rules',
    control,
  })

  return (
    <div className='flex flex-col gap-4'>
      <FormField
        control={control}
        name='rules'
        render={() => (
          <FormItem>
            <FormLabel>Rules</FormLabel>

            <div className='flex flex-col gap-2'>
              {fields.map((_, index) => (
                <div key={index} className='flex gap-4'>
                  <FormField
                    control={control}
                    name={`rules.${index}.text`}
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <Input
                            placeholder='Clean the kitchen after you cook'
                            {...field}
                            value={value[index]?.text || ''}
                            className=''
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant='destructive'
                    size='icon'
                    className='flex-shrink-0'
                    type='button'
                    onClick={() => remove(index)}
                  >
                    <FiX size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />

      <div className='text-right'>
        <Button
          type='button'
          variant='outline'
          className='h-[38px] md:h-10'
          onClick={() => append({ text: '' })}
        >
          <span className='mr-1'>
            <FiPlus />
          </span>
          Add
        </Button>
      </div>
    </div>
  )
}

export { DynamicRuleField }
