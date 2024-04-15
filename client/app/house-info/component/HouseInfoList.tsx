import React from 'react'
import { IconType } from 'react-icons/lib'
import { MdAccountCircle, MdPushPin } from 'react-icons/md'
import { colorMap } from '@/_consts'
import { RuleType } from '@/_types'

type HouseInfoListProps = {
  rules: RuleType[]
  members: { id: number; name: string; icon: IconType }[]
}

const HouseInfoList = ({ rules, members }: HouseInfoListProps) => {
  return (
    <>
      <h2 className='mt-6 text-lg font-semibold md:mt-8 md:text-2xl'>Rules</h2>
      <div className='mt-2 flex flex-col gap-3 rounded-md border border-amber-400 bg-amber-100 px-2 py-4 md:mt-4 md:px-7 md:py-7'>
        {rules.map((rule) => (
          <div key={rule.id} className='flex items-center'>
            <MdPushPin className='mr-2 h-auto w-5 min-w-5 text-teal-700 md:mr-3 md:w-7 md:min-w-7' />
            <span className='text-sm font-semibold md:text-lg'>
              {rule.text}
            </span>
          </div>
        ))}
        {rules.length === 0 && (
          <span className='text-sm font-semibold md:text-lg'>
            No rules have been added.
          </span>
        )}
      </div>
      <h2 className='mt-6 text-lg font-semibold md:mt-8 md:text-2xl'>
        Members
      </h2>
      <div className='mt-2 flex flex-col gap-3 rounded-md border border-amber-400 bg-amber-100 px-2 py-4 md:mt-4 md:px-7 md:py-7'>
        {members.map((member) => (
          <div key={member.id} className='flex items-center'>
            <MdAccountCircle
              className={`mr-2 h-auto w-5 min-w-5 md:mr-3 md:w-7 md:min-w-7 ${colorMap[member.icon.toString()]}`}
            />
            <span className='text-sm font-semibold md:text-lg'>
              {member.name}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

export { HouseInfoList }
