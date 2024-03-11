import React from 'react'
import { MdPushPin } from 'react-icons/md'
import { RuleType } from '@/_types'

type RuleListProps = {
  rules: RuleType[]
}

const RuleList = ({ rules }: RuleListProps) => {
  return (
    <>
      <div className='mt-6 flex flex-col gap-3 rounded-md border border-amber-400 bg-amber-100 px-2 py-4 md:mt-8 md:px-7 md:py-7'>
        {rules.map((rule) => (
          <div key={rule.ruleId} className='flex items-center'>
            <MdPushPin className='mr-2 h-auto w-5 min-w-5 text-teal-700 md:mr-3 md:w-6 md:min-w-6' />
            <p className=' text-sm font-semibold md:text-lg'>{rule.text}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export { RuleList }
