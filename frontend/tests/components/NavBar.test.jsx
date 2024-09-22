import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import NavBar from '../../src/components/NavBar'

test('Logo text is rendered', async () => {
  render(
    <NavBar />
  )

  const logoText = screen.getByRole('heading')

  expect(logoText).toHaveAccessibleName('Eventually')

  
})
