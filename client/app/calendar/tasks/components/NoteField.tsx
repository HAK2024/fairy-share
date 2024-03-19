import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/_components/ui'
import { Textarea } from '@/_components/ui/Textarea'

type NoteFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>
  name: Path<TFormValues>
}

const NoteField = <TFormValues extends FieldValues>({
  control,
  name,
}: NoteFieldProps<TFormValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex flex-col'>
        <FormLabel>Note</FormLabel>
        <FormControl>
          <Textarea className='bg-slate-50' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export { NoteField }
