import { Header } from '../Header'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutNavigation: Story = {
  args: {
    hasNavigation: false,
  },
}
