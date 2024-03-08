import React from 'react'
import { MdPushPin } from 'react-icons/md'
import { useGetHouseQuery } from '@/_hooks/api'

const RuleList = () => {
  const { data: house } = useGetHouseQuery()

  return (
    <>
      <div className='mt-6 border border-amber-400 bg-amber-100 md:mt-8'>
        {house?.rules.map((rule, index) => (
          <div
            key={index}
            className='mx-4 my-7 flex items-center md:mx-6 md:my-8 '
          >
            <MdPushPin className='mr-2 h-auto w-5 min-w-5 text-teal-700 md:mr-3 md:w-6 md:min-w-6' />
            <p className='text-sm font-semibold md:text-lg'>{rule.text}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export { RuleList }
