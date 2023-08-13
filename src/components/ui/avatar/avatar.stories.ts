import { Meta, StoryObj } from '@storybook/react'

import { AvatarDemo } from './index.ts'

const meta = {
  title: 'Components/AvatarDemo',
  component: AvatarDemo,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AvatarDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Avatar: Story = {
  args: {},
}
