"use strict";

exports.__esModule = true;
exports.default = formatLocale;
var _d3Time = require("../d3Time");
const mathFloor = Math.floor,
  pads = {
    "-": "",
    "_": " ",
    "0": "0"
  },
  pad = (value, fill, width) => {
    const sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  },
  formatDayOfMonth = (d, p) => pad(d.getDate(), p, 2),
  formatHour24 = (d, p) => pad(d.getHours(), p, 2),
  formatHour12 = (d, p) => pad(d.getHours() % 12 || 12, p, 2),
  formatDayOfYear = (d, p) => pad(1 + _d3Time.timeDay.count((0, _d3Time.timeYear)(d), d), p, 3),
  formatMilliseconds = (d, p) => pad(d.getMilliseconds(), p, 3),
  formatMicroseconds = (d, p) => formatMilliseconds(d, p) + "000",
  formatMonthNumber = (d, p) => pad(d.getMonth() + 1, p, 2),
  formatMinutes = (d, p) => pad(d.getMinutes(), p, 2),
  formatSeconds = (d, p) => pad(d.getSeconds(), p, 2),
  formatWeekdayNumberMonday = d => {
    const day = d.getDay();
    return day === 0 ? 7 : day;
  },
  formatWeekNumberSunday = (d, p) => pad(_d3Time.timeSunday.count((0, _d3Time.timeYear)(d) - 1, d), p, 2),
  dISO = d => {
    const day = d.getDay();
    return day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : _d3Time.timeThursday.ceil(d);
  },
  formatWeekNumberISO = (d, p) => {
    d = dISO(d);
    return pad(_d3Time.timeThursday.count((0, _d3Time.timeYear)(d), d) + ((0, _d3Time.timeYear)(d).getDay() === 4), p, 2);
  },
  formatWeekdayNumberSunday = d => d.getDay(),
  formatWeekNumberMonday = (d, p) => pad(_d3Time.timeMonday.count((0, _d3Time.timeYear)(d) - 1, d), p, 2),
  formatYear = (d, p) => pad(d.getFullYear() % 100, p, 2),
  formatYearISO = (d, p) => {
    d = dISO(d);
    return pad(d.getFullYear() % 100, p, 2);
  },
  formatFullYear = (d, p) => pad(d.getFullYear() % 10000, p, 4),
  formatFullYearISO = (d, p) => {
    let day = d.getDay();
    d = day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : _d3Time.timeThursday.ceil(d);
    return pad(d.getFullYear() % 10000, p, 4);
  },
  formatZone = d => {
    let z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
  },
  formatLiteralPercent = () => "%",
  formatUnixTimestamp = d => +d,
  formatUnixTimestampSeconds = d => mathFloor(+d / 1000);
function formatLocale(locale) {
  const locale_dateTime = locale.dateTime,
    locale_date = locale.date,
    locale_time = locale.time,
    locale_periods = locale.periods,
    locale_weekdays = locale.days,
    locale_shortWeekdays = locale.shortDays,
    locale_months = locale.months,
    locale_shortMonths = locale.shortMonths,
    formatShortWeekday = d => locale_shortWeekdays[d.getDay()],
    formatWeekday = d => locale_weekdays[d.getDay()],
    formatShortMonth = d => locale_shortMonths[d.getMonth()],
    formatMonth = d => locale_months[d.getMonth()],
    formatPeriod = d => locale_periods[+(d.getHours() >= 12)],
    formatQuarter = d => 1 + ~~(d.getMonth() / 3),
    formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "g": formatYearISO,
      "G": formatFullYearISO,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "q": formatQuarter,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    },
    newFormat = (specifier, formats) => date => {
      let string = [],
        i = -1,
        j = 0,
        n = specifier.length,
        c,
        pad,
        format;
      if (!(date instanceof Date)) date = new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
          /*eslint-disable no-cond-assign*/
          if (format = formats[c]) c = format(date, pad);
          /*eslint-enable no-cond-assign*/
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  return {
    format: specifier => {
      const f = newFormat(specifier += "", formats);
      f.toString = () => specifier;
      return f;
    }
  };
}
//# sourceMappingURL=locale.js.map