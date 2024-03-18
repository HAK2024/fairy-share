import { Button } from '../..'
import { Heading } from '../Heading'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'ui/Heading',
  component: Heading,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className='px-4 pb-10 pt-8 md:px-14 md:pb-20 md:pt-10'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Heading',
    buttonComponent: <Button variant={'default'}>Button</Button>,
  },
}

export const HeadingWithoutButton: Story = {
  args: {
    title: 'Fairy Share',
  },
}

export const HeadingWithRulesButton: Story = {
  args: {
    title: 'Fairy Share',
    buttonComponent: <Button variant={'outline'}>Rules</Button>,
  },
}
