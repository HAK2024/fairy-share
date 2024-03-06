import { RouterLink } from '../RouterLink'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'ui/RouterLink',
  component: RouterLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RouterLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Link',
    href: '/',
  },
}
