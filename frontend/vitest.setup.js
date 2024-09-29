import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, afterAll } from 'vitest'

import { server } from './tests/mocks/server'

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
})


afterAll(() => server.close());