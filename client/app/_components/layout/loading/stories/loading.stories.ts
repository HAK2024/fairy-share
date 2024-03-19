import { Loading } from '../Loading'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'layout/Loading',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const IsCenter: Story = {
  args: {
    isCenter: true,
  },
}
