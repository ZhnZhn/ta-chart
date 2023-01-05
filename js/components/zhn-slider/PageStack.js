"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _uiApi = require("../uiApi");
var PageStack = function PageStack(_ref) {
  var style = _ref.style,
    pages = _ref.pages,
    pageCurrent = _ref.pageCurrent,
    onPrevPage = _ref.onPrevPage,
    onNextPage = _ref.onNextPage;
  return pages.map(function (Page, index) {
    return (0, _uiApi.cloneElement)(Page, {
      style: style,
      pageCurrent: pageCurrent,
      pageNumber: index + 1,
      onPrevPage: onPrevPage,
      onNextPage: onNextPage
    });
  });
};
var _default = PageStack;
exports["default"] = _default;
//# sourceMappingURL=PageStack.js.map