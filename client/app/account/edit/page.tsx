// 'use client'

// import React from 'react'
// import { FormContainer, Loading } from '@/_components/layout'
// import { Heading } from '@/_components/ui'
// import { useGetMeQuery } from '@/_hooks/api'
// import { EditAccountForm } from '../components'

// export default function Account() {
//   const { data: user, isLoading } = useGetMeQuery()
//   // TODO: error handling

//   return (
//     <FormContainer>
//       <div className='flex flex-col gap-8 md:gap-6 '>
//         <Heading title='Edit Account' />
//         {isLoading || !user ? <Loading /> : <EditAccountForm user={user} />}
//       </div>
//     </FormContainer>
//   )
// }
