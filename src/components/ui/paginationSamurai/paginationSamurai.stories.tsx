import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { PaginationSamurai } from './paginationSamurai.tsx'

const meta = {
  title: 'Components/PaginationSamurai',
  component: PaginationSamurai,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PaginationSamurai>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationSamuraiComponent: Story = {
  args: {
    amountDecksInOnePage: 8,
    allElements: 1200,
    valueCurrentPage: 1,
    setCurrentPage: action('setCurrentPage'),
    setAmountElementsInOnePage: action('setAmountElementsInOnePage'),
  },
}
