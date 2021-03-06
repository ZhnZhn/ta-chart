"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

var PERIOD_MS = 750;
var S = {
  SHOW_HIDE: {
    position: 'absolute',
    overflow: 'hidden'
  },
  PAGES: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    overflowX: 'hidden',
    transition: "all " + PERIOD_MS + "ms ease-out"
  }
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

var ModalSlider = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ModalSlider, _Component);

  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
      pageWidth: PropTypes.number,
    maxPages: PropTypes.number,
      onClose: PropTypes.func
  }
  */
  function ModalSlider(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._crPageElement = function (id) {
      return /*#__PURE__*/(0, _react.createElement)(_this.props.pageRouter[id], {
        key: id,
        style: _this._pageStyle,
        onPrevPage: _this.hPrevPage,
        onNextPage: _this.hNextPage
      });
    };

    _this.hPrevPage = function () {
      _this.setState(function (prevState) {
        if (prevState.pageCurrent > 1) {
          prevState.pageCurrent -= 1;
          _this._direction = -1;
        }

        return prevState;
      });
    };

    _this.hNextPage = function (id) {
      _this.setState(function (prevState) {
        var pages = prevState.pages;

        var _pageIndex = _findIndexById(pages, id);

        prevState.pages = _pageIndex !== -1 ? _replaceElTo2(pages, _pageIndex) : _addElTo2(pages, _this._crPageElement(id));
        prevState.pageCurrent += 1;
        _this._direction = 1;
        return prevState;
      });
    };

    _this._crTransform = function () {
      var pagesEl = _this._refPages.current;
      var WIDTH = _this._PAGE_WIDTH;
      var dX = 0;

      if (_this._direction !== 0 && pagesEl) {
        var prevInt = _getTranslateX(pagesEl);

        dX = _this._direction === 1 ? prevInt - WIDTH : prevInt + WIDTH;
        _this._direction = 0;
      } else if (_this._direction === 0 && pagesEl) {
        dX = _getTranslateX(pagesEl);
      }

      return {
        transform: "translateX(" + dX + "px)"
      };
    };

    _this._renderPages = function () {
      var _this$state = _this.state,
          pages = _this$state.pages,
          pageCurrent = _this$state.pageCurrent;
      return pages.map(function (Page, index) {
        return /*#__PURE__*/(0, _react.cloneElement)(Page, {
          pageCurrent: pageCurrent,
          pageNumber: index + 1
        });
      });
    };

    var pageWidth = props.pageWidth,
        maxPages = props.maxPages,
        initialPageId = props.initialPageId;
    _this._refPages = /*#__PURE__*/(0, _react.createRef)();
    _this.hNextPage = (0, _throttleOnce["default"])(_this.hNextPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.hPrevPage = (0, _throttleOnce["default"])(_this.hPrevPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this._PAGE_WIDTH = pageWidth;
    _this._pagesStyle = {
      width: maxPages * pageWidth + "px"
    };
    _this._pageStyle = {
      width: pageWidth + "px"
    };
    _this._direction = 0;
    _this.state = {
      pageCurrent: 1,
      pages: [_this._crPageElement(initialPageId)]
    };
    return _this;
  }

  var _proto = ModalSlider.prototype;

  _proto.render = function render() {
    var _pagesStyle = this._pagesStyle,
        _transform = this._crTransform(),
        _divStyle = (0, _extends2["default"])({}, S.PAGES, _pagesStyle, _transform);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.SHOW_HIDE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ref: this._refPages,
        style: _divStyle,
        children: this._renderPages()
      })
    });
  };

  return ModalSlider;
}(_react.Component);

ModalSlider.defaultProps = {
  pageWidth: 330,
  maxPages: 3
};
var _default = ModalSlider;
exports["default"] = _default;
//# sourceMappingURL=CompSlider.js.map