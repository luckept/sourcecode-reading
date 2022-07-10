import CAC from '../main/CAC'
import { describe, test, expect } from 'vitest'

describe('cac build', () => {
  test('cac name', () => {
    const cac = new CAC('test')
    expect(cac.name).toBe('test')
  })
})