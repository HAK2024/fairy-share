import { useForm } from 'react-hook-form'
import { loginResolver, LoginSchema } from '../schema'

export const useLogin = () => {
  const form = useForm<LoginSchema>({
    resolver: loginResolver,
  })

  const onLogin = async (data: LoginSchema) => {
    console.log('login', data)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onLogin),
  }
}
