import Image from 'next/image'
import { Logo } from '../Logo'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Logo> = {
  title: 'ui/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    width: 150,
    height: 150,
  },
}

export default meta
type Story = StoryObj<typeof Logo>
export const WithAnImage: Story = {
  render: ({ width, height }) => (
    <Image
      priority={true}
      src={`/images/logo/logo.png`}
      alt={'logo'}
      width={width}
      height={height}
      unoptimized // To avoid Next.js optimization running on the server (https://storybook.js.org/blog/get-started-with-storybook-and-next-js/)
    />
  ),
}

export const Large: StoryObj<typeof Logo> = {
  args: {
    width: 200,
    height: 200,
  },
}

export const Small: StoryObj<typeof Logo> = {
  args: {
    width: 100,
    height: 100,
  },
}
