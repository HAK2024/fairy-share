import React from 'react'
import { FiUser } from 'react-icons/fi'
import { MdPushPin } from 'react-icons/md'
import { RuleType } from '@/_types'

type HouseInfoListProps = {
  rules: RuleType[]
  members: { id: number; name: string }[]
}

const HouseInfoList = ({ rules, members }: HouseInfoListProps) => {
  return (
    <>
      <h2 className='mt-6 text-lg font-semibold md:mt-8 md:text-2xl'>Rules</h2>
      <div className='mt-2 flex flex-col gap-3 rounded-md border border-amber-400 bg-amber-100 px-2 py-4 md:mt-4 md:px-7 md:py-7'>
        {rules.map((rule) => (
          <div key={rule.id} className='flex items-center'>
            <MdPushPin className='mr-2 h-auto w-5 min-w-5 text-teal-700 md:mr-3 md:w-6 md:min-w-6' />
            <p className='text-sm font-semibold md:text-lg'>{rule.text}</p>
          </div>
        ))}
      </div>
      <h2 className='mt-6 text-lg font-semibold md:mt-8 md:text-2xl'>
        Members
      </h2>
      <div className='mt-2 flex flex-col gap-3 rounded-md border border-amber-400 bg-amber-100 px-2 py-4 md:mt-4 md:px-7 md:py-7'>
        {members.map((member) => (
          <div key={member.id} className='flex items-center'>
            <FiUser className='mr-2 h-auto w-5 min-w-5 text-teal-700 md:mr-3 md:w-6 md:min-w-6' />
            <p className='text-sm font-semibold md:text-lg'>{member.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export { HouseInfoList }
