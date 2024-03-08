import { RegisterForm } from '../components'

export default function RegisterPage() {
  return (
    <div className='flex min-h-svh flex-col items-center bg-amber-50 px-4 py-10 md:bg-gradient-to-tr md:from-amber-100 md:to-amber-500 lg:justify-center lg:py-10'>
      <RegisterForm />
    </div>
  )
}
