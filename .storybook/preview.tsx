import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import type { Preview } from '@storybook/react'
import '../src/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}
export default preview
