import { SettingDropdown } from '../SettingDropdown'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'layout/SettingDropdown',
  component: SettingDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
