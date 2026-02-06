import toFirstUpperCase from '../toFirstUpperCase';

describe('utils toFirstUpperCase', () => {
  const fn = toFirstUpperCase;
  it('should return string with first letter in upper case', () => {
    expect(fn('str')).toBe('Str')
    expect(fn('a')).toBe('A')
    expect(fn('')).toBe('')
    expect(fn('some text')).toBe('Some text')
  })
  it('should return empty string in edge cases', () => {
    expect(fn()).toBe('')
    expect(fn(null)).toBe('')
    expect(fn(true)).toBe('')
    expect(fn(1)).toBe('')

    expect(fn([])).toBe('')
    expect(fn({})).toBe('')
    expect(fn(()=>{})).toBe('')
  })
})
