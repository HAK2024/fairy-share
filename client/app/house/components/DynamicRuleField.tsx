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
import { HouseType } from '@/_types'
import { CreateHouseSchema, UpdateHouseSchema } from '../schema'

type DynamicRuleFieldProps = {
  defaultData?: HouseType
}

const DynamicRuleField = ({ defaultData }: DynamicRuleFieldProps) => {
  const { control } = useFormContext<CreateHouseSchema | UpdateHouseSchema>()

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
              {fields.map((field, index) => (
                <div key={field.id} className='flex gap-4'>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant='destructiveOutline'
                    size='icon'
                    className='flex-shrink-0'
                    type='button'
                    onClick={() => remove(index)}
                    aria-label={`Remove rule of ${value[index]?.text}`}
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
          className='h-[38px] px-4 py-2 text-sm md:h-10 md:px-5 md:text-base'
          onClick={() =>
            append(
              defaultData
                ? ({ id: null, text: '' } as { id: null; text: string })
                : { text: '' },
            )
          }
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
