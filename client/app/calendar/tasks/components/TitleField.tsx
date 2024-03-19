import { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/_components/ui'

type TitleFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>
  name: Path<TFormValues>
}

const TitleField = <TFormValues extends FieldValues>({
  control,
  name,
}: TitleFieldProps<TFormValues>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Title <span className='text-destructive'>*</span>
        </FormLabel>
        <FormControl>
          <Input placeholder='Enter task title' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export { TitleField }
