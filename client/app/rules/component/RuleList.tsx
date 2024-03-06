import React from 'react'
import { MdPushPin } from 'react-icons/md'
import { Header, Footer } from '@/_components/layout'
import { Heading } from '@/_components/ui/heading/Heading'

interface House {
  id: number
  name: string
  rules: { id: number; text: string; houseId: number }[]
}

const house: House = {
  id: 106,
  name: 'Green Villa',
  rules: [
    {
      id: 121,
      text: 'Keep the kitchen clean',
      houseId: 106,
    },
    {
      id: 122,
      text: 'No loud music after 10 PM No loud music after 10 PM',
      houseId: 106,
    },
    {
      id: 123,
      text: 'Sort the trash for recycling',
      houseId: 107,
    },
    {
      id: 124,
      text: 'Clean the bathroom weekly Clean the bathroom weekly',
      houseId: 107,
    },
    {
      id: 125,
      text: 'Sort the trash for recycling',
      houseId: 108,
    },
    {
      id: 126,
      text: 'Clean the bathroom weekly',
      houseId: 108,
    },
  ],
}

const RuleList = () => {
  return (
    <>
      <Header />
      {/* <div className='px-4 pb-6 pt-8 md:px-14 md:pb-8 md:pt-10'> */}
      <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
        <Heading title={house.name} buttonComponent={null} />

        <div className='mt-8 border border-amber-400 bg-amber-100'>
          {house.rules.map((rule, index) => (
            <div
              key={index}
              className='mx-4 my-7 flex items-center md:mx-6 md:my-8 '
            >
              <MdPushPin className='mr-2 h-auto w-5 min-w-5 text-teal-700 md:mr-3 md:w-6 md:min-w-6' />
              <p className='text-sm font-semibold md:text-lg'>{rule.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export { RuleList }
