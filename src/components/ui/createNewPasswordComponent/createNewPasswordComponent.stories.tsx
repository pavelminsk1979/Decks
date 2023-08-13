import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordComponent } from './createNewPasswordComponent.tsx'

const meta = {
  title: 'Components/CreateNewPasswordComponent',
  component: CreateNewPasswordComponent,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CreateNewPasswordComponent>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPassword: Story = {}
