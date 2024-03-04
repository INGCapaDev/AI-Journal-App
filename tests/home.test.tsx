// make a test using vitest and jest-dom
// import { render, screen } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../src/app/page'
import { PropsWithChildren } from 'react'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userID: 'user_2NNEqL2nrIR24jsal45DlsDG' })
      ),
    ClerkProvider: ({ children }: PropsWithChildren) => <div>{children}</div>,
    useUser: () => ({
      isLogged: true,
      user: {
        id: 'user_2NNEqL2nrIR24jsal45DlsDG',
        fullName: 'John Doe',
      },
    }),
  }
})

test('Home', async () => {
  render(await (<Page />))
  expect(screen.getByText('The best Journal app, period.')).toBeTruthy()
})
