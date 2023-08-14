import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { EditIcon } from '../../../assets/icons/editIcon.tsx'
import { Logout } from '../../../assets/icons/iconLogOut.tsx'
import { IconMoreVerticalOutline } from '../../../assets/icons/iconMoreVerticalOutline.tsx'
import { IconMyProfile } from '../../../assets/icons/iconMyProfile.tsx'
import iconUser from '../../../assets/icons/iconUser.png'
import { PlayIcon } from '../../../assets/icons/playIcon.tsx'
import { NameAndAvatarComponent } from '../nameAndAvatarComponent'

import { DropDownComponent } from './dropDownComponent.tsx'

const meta = {
  title: 'Components/DropDownComponent',
  component: DropDownComponent,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownComponent>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownStory1: Story = {
  args: {
    data: [
      {
        id: 3,
        icon: <PlayIcon />,
        name: 'Learn',
        callback: action('Learn'),
      },
      {
        id: 4,
        icon: <EditIcon />,
        name: 'Edit',
        callback: action('Edit'),
      },
      {
        id: 5,
        icon: <DeleteIcon />,
        name: 'Delete',
        callback: action('Delete'),
      },
    ],
    component: <IconMoreVerticalOutline width="33" height="33" />,
  },
}

export const DropDownStory2: Story = {
  args: {
    data: [
      {
        id: 1,
        icon: <IconMyProfile width="22" height="22" />,
        name: 'My Profile',
        callback: action('My Profile'),
      },
      {
        id: 2,
        icon: <Logout width="20" height="20" />,
        name: 'Sing Out',
        callback: action('Sing Out'),
      },
    ],
    dataHeader: {
      icon: <img src={iconUser} style={{ height: '50px' }} />,
      name: 'Павел',
      gmail: 'p&pavel@gmail.com',
    },
    component: <NameAndAvatarComponent />,
  },
}
