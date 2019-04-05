'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _throttleOnce = require('../../utils/throttleOnce');

var _throttleOnce2 = _interopRequireDefault(_throttleOnce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    transition: 'all ' + PERIOD_MS + 'ms ease-out'
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
  return [arr[0], arr.splice(index, 1)[0]].concat((0, _toConsumableArray3.default)(arr.slice(1)));
};
var _addElTo2 = function _addElTo2(arr, el) {
  return [arr[0], el].concat((0, _toConsumableArray3.default)(arr.slice(1)));
};

var ModalSlider = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ModalSlider, _Component);

  function ModalSlider(props) {
    (0, _classCallCheck3.default)(this, ModalSlider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ModalSlider.__proto__ || Object.getPrototypeOf(ModalSlider)).call(this, props));

    _this._crPageElement = function (id) {
      return _react2.default.createElement(_this.props.pageRouter[id], {
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
        transform: 'translateX(' + dX + 'px)'
      };
    };

    _this._renderPages = function () {
      var _this$state = _this.state,
          pages = _this$state.pages,
          pageCurrent = _this$state.pageCurrent;

      return pages.map(function (Page, index) {
        return _react2.default.cloneElement(Page, {
          pageCurrent: pageCurrent,
          pageNumber: index + 1
        });
      });
    };

    var pageWidth = props.pageWidth,
        maxPages = props.maxPages,
        initialPageId = props.initialPageId;


    _this._refPages = _react2.default.createRef();

    _this.hNextPage = (0, _throttleOnce2.default)(_this.hNextPage.bind(_this));
    _this.hPrevPage = (0, _throttleOnce2.default)(_this.hPrevPage.bind(_this));

    _this._PAGE_WIDTH = pageWidth;
    _this._pagesStyle = {
      width: maxPages * pageWidth + 'px'
    };
    _this._pageStyle = {
      width: pageWidth + 'px'
    };
    _this._direction = 0;

    _this.state = {
      pageCurrent: 1,
      pages: [_this._crPageElement(initialPageId)]
    };
    return _this;
  }
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

  (0, _createClass3.default)(ModalSlider, [{
    key: 'render',
    value: function render() {
      var _pagesStyle = this._pagesStyle,
          _transform = this._crTransform(),
          _divStyle = (0, _extends3.default)({}, S.PAGES, _pagesStyle, _transform);

      return _react2.default.createElement(
        'div',
        { style: S.SHOW_HIDE },
        _react2.default.createElement(
          'div',
          {
            ref: this._refPages,
            style: _divStyle
          },
          this._renderPages()
        )
      );
    }
  }]);
  return ModalSlider;
}(_react.Component), _class.defaultProps = {
  pageWidth: 330,
  maxPages: 3
}, _temp);
exports.default = ModalSlider;
//# sourceMappingURL=CompSlider.js.map