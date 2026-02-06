"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _toFirstUpperCase = _interopRequireDefault(require("../toFirstUpperCase"));
describe('utils toFirstUpperCase', () => {
  const fn = _toFirstUpperCase.default;
  it('should return string with first letter in upper case', () => {
    expect(fn('str')).toBe('Str');
    expect(fn('a')).toBe('A');
    expect(fn('')).toBe('');
    expect(fn('some text')).toBe('Some text');
  });
  it('should return empty string in edge cases', () => {
    expect(fn()).toBe('');
    expect(fn(null)).toBe('');
    expect(fn(true)).toBe('');
    expect(fn(1)).toBe('');
    expect(fn([])).toBe('');
    expect(fn({})).toBe('');
    expect(fn(() => {})).toBe('');
  });
});
//# sourceMappingURL=toFirstUpperCase.test.js.map