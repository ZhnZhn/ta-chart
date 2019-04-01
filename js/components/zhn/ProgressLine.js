'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = 'progress-line';
var DF_COLOR = '#2f7ed8';

var TR = {
  WIDTH: 'width 500ms ease-out',
  OPACITY: 'opacity 400ms linear'
};

var _crStyle = function _crStyle(backgroundColor, opacity, width, height, transition) {
  return {
    backgroundColor: backgroundColor,
    opacity: opacity,
    width: width,
    height: height,
    transition: transition
  };
};

var ProgressLine = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ProgressLine, _Component);

  function ProgressLine(props) {
    (0, _classCallCheck3.default)(this, ProgressLine);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProgressLine.__proto__ || Object.getPrototypeOf(ProgressLine)).call(this, props));

    _this._crLineStyle = function (color, height) {
      if (_this.wasOpacied) {
        _this.wasOpacied = false;
        return _crStyle(color, 1, 0, height);
      } else if (_this.wasCompleted) {
        _this.wasCompleted = false;
        _this.wasOpacied = true;
        return _crStyle(color, 0, '100%', height, TR.OPACITY);
      } else {
        var completed = _this.props.completed;

        if (completed < 0) {
          completed = 0;
        } else if (completed >= 100) {
          completed = 100;
          _this.wasCompleted = true;
        }
        return _crStyle(color, 1, completed + '%', height, TR.WIDTH);
      }
    };

    _this.wasCompleted = false;
    _this.idCompleted = null;
    _this.wasOpacied = false;
    _this.idOpacied = null;
    return _this;
  }

  (0, _createClass3.default)(ProgressLine, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.idCompleted) {
        clearTimeout(this.idCompleted);
      }
      if (this.idOpacied) {
        clearTimeout(this.idOpacied);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (this.wasCompleted) {
        this.idCompleted = setTimeout(function () {
          _this2.idCompleted = null;
          _this2.forceUpdate();
        }, 800);
      } else if (this.wasOpacied) {
        this.idOpacied = setTimeout(function () {
          _this2.idOpacied = null;
          _this2.forceUpdate();
        }, 800);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          color = _props.color,
          height = _props.height,
          _style = this._crLineStyle(color, height);

      return _react2.default.createElement('div', { className: CL, style: _style });
    }
  }]);
  return ProgressLine;
}(_react.Component), _class.defaultProps = {
  color: DF_COLOR,
  height: 3
}, _temp);
exports.default = ProgressLine;
//# sourceMappingURL=ProgressLine.js.map