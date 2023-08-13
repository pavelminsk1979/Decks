import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { EditIcon } from '../../../assets/icons/editIcon.tsx'
import { IconMoreVerticalOutline } from '../../../assets/icons/iconMoreVerticalOutline.tsx'
import { PlayIcon } from '../../../assets/icons/playIcon.tsx'

import { DropDownComponent } from './dropDownComponent.tsx'

const meta = {
  title: 'Components/DropDownComponent',
  component: DropDownComponent,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownComponent>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  args: {
    data: [
      {
        id: 3,
        icon: <PlayIcon />,
        name: 'Learn',
        callback: action('1111111'),
      },
      {
        id: 4,
        icon: <EditIcon />,
        name: 'Edit',
        callback: action('2222222'),
      },
      {
        id: 5,
        icon: <DeleteIcon />,
        name: 'Delete',
        callback: action('3333333'),
      },
    ],
    component: <IconMoreVerticalOutline width="33" height="33" />,
  },
}
