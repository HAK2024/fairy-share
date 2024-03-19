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
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateHouseSchema>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rules',
  })

  const value = useWatch({
    name: 'rules',
    control,
  })

  const emptyArrayErrorMessage = errors?.rules?.root?.message

  return (
    <div>
      <FormField
        control={control}
        name='rules'
        render={() => (
          <FormItem>
            <FormLabel isRequired>Rules</FormLabel>

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

      {/* Error Message for empty array */}
      {emptyArrayErrorMessage && (
        <p className='mt-1 text-sm font-medium text-destructive'>
          {emptyArrayErrorMessage}
        </p>
      )}

      <div className='mt-4 text-right'>
        <Button
          type='button'
          variant='outline'
          className=''
          onClick={() => append({ text: '' })}
        >
          <FiPlus />
          Add
        </Button>
      </div>
    </div>
  )
}

export { DynamicRuleField }
