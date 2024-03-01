import { Header } from '../Header'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'ui/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
