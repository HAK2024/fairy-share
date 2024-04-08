import { useState } from 'react'
import { format } from 'date-fns'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { BiCalendarAlt } from 'react-icons/bi'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  CustomDayPicker,
} from '@/_components/ui'

export type DateFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>
  name: Path<TFormValues>
  placeholder: string
  disabledDates: 'future' | 'past' | null
}

const DateField = <TFormValues extends FieldValues>({
  control,
  name,
  placeholder,
  disabledDates,
}: DateFieldProps<TFormValues>) => {
  const [isCalendarOpen, setCalendarOpen] = useState(false)

  const handleDisableDates = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    switch (disabledDates) {
      case 'future':
        return date > today
      case 'past':
        return date < today
      default:
        return false
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className='flex flex-col'>
          <FormLabel isRequired>Date</FormLabel>
          <FormControl>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      className={`flex h-10 w-full cursor-pointer rounded-md border border-input bg-slate-50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        !field.value && 'text-slate-400'
                      } ${
                        isCalendarOpen
                          ? 'border border-input ring-2 ring-ring ring-offset-2 ring-offset-background'
                          : ''
                      }`}
                    >
                      {field.value ? format(field.value, 'PPP') : placeholder}
                      <BiCalendarAlt className='ml-auto h-6 w-6 opacity-50' />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <CustomDayPicker
                      mode='single'
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date)
                        setCalendarOpen(false)
                      }}
                      disabled={handleDisableDates}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { DateField }
