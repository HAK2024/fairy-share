import { Footer } from '../Footer'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
