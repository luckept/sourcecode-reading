import CAC from '../main/CAC'

describe('cac build', () => {
  test('cac name', () => {
    const cac = new CAC('test')
    expect(cac.name).toBe('test')
  })
})