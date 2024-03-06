import { useForm } from 'react-hook-form'
import { registerResolver, RegisterSchema } from '../schema'

export const useRegister = () => {
  const form = useForm<RegisterSchema>({
    resolver: registerResolver,
  })

  const onRegister = async (data: RegisterSchema) => {
    console.log('register', data)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onRegister),
  }
}
