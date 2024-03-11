import { PasswordInput } from '../PasswordInput'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'ui/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
