import React, { useState } from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/_components/ui'
import { DropdownMenuCheckboxItem } from '@/_components/ui/DropdownMenu'

type AssigneeFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>
  name: Path<TFormValues>
  houseMembers: { id: number; name: string }[]
}

const AssigneeField = <TFormValues extends FieldValues>({
  control,
  name,
  houseMembers,
}: AssigneeFieldProps<TFormValues>) => {
  const { field } = useController({ name, control })

  const selectedAssigneeName =
    houseMembers.find((member) => member.id === field.value)?.name ||
    'Select assignee'

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className='flex w-full flex-col'>
          <FormLabel isRequired>Assignee</FormLabel>
          <FormControl>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <DropdownMenu
                  open={isDropdownOpen}
                  onOpenChange={setDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-slate-50 px-3 py-2 text-left text-sm ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!field.value ? 'text-slate-400' : ''} ${
                        isDropdownOpen
                          ? 'border border-input ring-2 ring-ring ring-offset-2 ring-offset-background'
                          : ''
                      }`}
                    >
                      {selectedAssigneeName}
                      <CaretSortIcon className='h-6 w-6 opacity-50' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    style={{
                      // To set the same width as the trigger (https://www.radix-ui.com/primitives/docs/components/dropdown-menu)
                      width: 'var(--radix-dropdown-menu-trigger-width)',
                    }}
                  >
                    {houseMembers?.map((member) => (
                      <DropdownMenuCheckboxItem
                        key={member.id}
                        checked={field.value === member.id}
                        onCheckedChange={() =>
                          field.onChange(
                            field.value === member.id ? null : member.id,
                          )
                        }
                        className={`${
                          field.value === member.id
                            ? 'w-full bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground'
                            : ''
                        } ${!field.value ? 'pl-2' : ''}`}
                      >
                        {member.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { AssigneeField }
