"use strict";

exports.__esModule = true;
exports.local = local;
function local(year, month, day, hours, minutes, seconds, milliseconds) {
  if (year == null) year = 0;
  if (month == null) month = 0;
  if (day == null) day = 1;
  if (hours == null) hours = 0;
  if (minutes == null) minutes = 0;
  if (seconds == null) seconds = 0;
  if (milliseconds == null) milliseconds = 0;
  if (0 <= year && year < 100) {
    const date = new Date(-1, month, day, hours, minutes, seconds, milliseconds);
    date.setFullYear(year);
    return date;
  }
  return new Date(year, month, day, hours, minutes, seconds, milliseconds);
}
describe('d3Scale helper fns', () => {
  test('', () => {
    expect(true).toBe(true);
  });
});
//# sourceMappingURL=d3Scale.test.js.map