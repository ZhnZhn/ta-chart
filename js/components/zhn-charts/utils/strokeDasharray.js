"use strict";

exports.__esModule = true;
exports.getStrokeDasharrayCanvas = exports.getStrokeDasharray = void 0;

var getStrokeDasharray = function getStrokeDasharray(type) {
  switch (type) {
    default:
    case "Solid":
      return "none";

    case "ShortDash":
      return "6, 2";

    case "ShortDash2":
      return "6, 3";

    case "ShortDot":
      return "2, 2";

    case "ShortDashDot":
      return "6, 2, 2, 2";

    case "ShortDashDotDot":
      return "6, 2, 2, 2, 2, 2";

    case "Dot":
      return "2, 6";

    case "Dash":
      return "4, 6";

    case "LongDash":
      return "16, 6";

    case "DashDot":
      return "8, 6, 2, 6";

    case "LongDashDot":
      return "16, 6, 2, 6";

    case "LongDashDotDot":
      return "16, 6, 2, 6, 2, 6";
  }
};

exports.getStrokeDasharray = getStrokeDasharray;

var getStrokeDasharrayCanvas = function getStrokeDasharrayCanvas(type) {
  var a = getStrokeDasharray(type).split(",");
  return a.length === 1 ? [] : a.map(function (d) {
    return Number(d);
  });
};

exports.getStrokeDasharrayCanvas = getStrokeDasharrayCanvas;
//# sourceMappingURL=strokeDasharray.js.map