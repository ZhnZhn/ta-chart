"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var PageStack = function PageStack(_ref) {
  var pages = _ref.pages,
    pageCurrent = _ref.pageCurrent;
  return pages.map(function (Page, index) {
    return (0, _uiApi.cloneElement)(Page, {
      pageCurrent: pageCurrent,
      pageNumber: index + 1
    });
  });
};
var _default = PageStack;
exports["default"] = _default;
//# sourceMappingURL=PageStack.js.map