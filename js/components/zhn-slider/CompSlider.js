"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../uiApi");
var _useThrottleCallback = _interopRequireDefault(require("../hooks/useThrottleCallback"));
var _PageStack = _interopRequireDefault(require("./PageStack"));
var _jsxRuntime = require("react/jsx-runtime");
var PERIOD_MS = 750;
var S_SHOW_HIDE = {
    position: 'absolute',
    overflow: 'hidden'
  },
  S_PAGES = {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    transition: "all " + PERIOD_MS + "ms ease-out"
  };
var _getTranslateX = function _getTranslateX(node) {
  return parseInt(node.style.transform.substr(11).replace('px', '').replace(')', ''), 10);
};
var _findIndexById = function _findIndexById(arr, id) {
  return arr.findIndex(function (el) {
    return el.key === id;
  });
};
var _replaceElTo2 = function _replaceElTo2(arr, index) {
  return [arr[0], arr.splice(index, 1)[0]].concat(arr.slice(1));
};
var _addElTo2 = function _addElTo2(arr, el) {
  return [arr[0], el].concat(arr.slice(1));
};
var _crTransform = function _crTransform(pageWidth, _refPages, _refDirection) {
  var pagesEl = (0, _uiApi.getRefValue)(_refPages),
    _direction = (0, _uiApi.getRefValue)(_refDirection);
  var dX = 0;
  if (_direction !== 0 && pagesEl) {
    var prevInt = _getTranslateX(pagesEl);
    dX = _direction === 1 ? prevInt - pageWidth : prevInt + pageWidth;
    (0, _uiApi.setRefValue)(_refDirection, 0);
  } else if (_direction === 0 && pagesEl) {
    dX = _getTranslateX(pagesEl);
  }
  return {
    transform: "translateX(" + dX + "px)"
  };
};
var CompSlider = function CompSlider(_ref) {
  var _ref$pageWidth = _ref.pageWidth,
    pageWidth = _ref$pageWidth === void 0 ? 330 : _ref$pageWidth,
    _ref$maxPages = _ref.maxPages,
    maxPages = _ref$maxPages === void 0 ? 3 : _ref$maxPages,
    initialPageId = _ref.initialPageId,
    pageRouter = _ref.pageRouter;
  var _refPages = (0, _uiApi.useRef)(),
    _refDirection = (0, _uiApi.useRef)(0),
    _refPagesStyle = (0, _uiApi.useRef)({
      width: maxPages * pageWidth + "px"
    }),
    _refPageStyle = (0, _uiApi.useRef)({
      width: pageWidth + "px"
    }),
    _useState = (0, _uiApi.useState)({
      pageCurrent: 1,
      pages: [(0, _uiApi.createElement)(pageRouter[initialPageId], {
        key: initialPageId
      })]
    }),
    state = _useState[0],
    setState = _useState[1],
    pageCurrent = state.pageCurrent,
    pages = state.pages,
    hPrevPage = (0, _useThrottleCallback["default"])(function () {
      setState(function (prevState) {
        if (prevState.pageCurrent > 1) {
          prevState.pageCurrent -= 1;
          (0, _uiApi.setRefValue)(_refDirection, -1);
        }
        return (0, _extends2["default"])({}, prevState);
      });
    }),
    hNextPage = (0, _useThrottleCallback["default"])(function (id) {
      setState(function (prevState) {
        var pages = prevState.pages;
        var _pageIndex = _findIndexById(pages, id);
        prevState.pages = _pageIndex !== -1 ? _replaceElTo2(pages, _pageIndex) : _addElTo2(pages, (0, _uiApi.createElement)(pageRouter[id], {
          key: id
        }));
        prevState.pageCurrent += 1;
        (0, _uiApi.setRefValue)(_refDirection, 1);
        return (0, _extends2["default"])({}, prevState);
      });
    }),
    _transform = _crTransform(pageWidth, _refPages, _refDirection),
    _divStyle = (0, _extends2["default"])({}, (0, _uiApi.getRefValue)(_refPagesStyle), S_PAGES, _transform);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_SHOW_HIDE,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refPages,
      style: _divStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PageStack["default"], {
        style: (0, _uiApi.getRefValue)(_refPageStyle),
        pages: pages,
        pageCurrent: pageCurrent,
        onPrevPage: hPrevPage,
        onNextPage: hNextPage
      })
    })
  });
};
var _default = CompSlider;
exports["default"] = _default;
//# sourceMappingURL=CompSlider.js.map