"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

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

var ProgressLine = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ProgressLine, _Component);

  function ProgressLine(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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

        return _crStyle(color, 1, completed + "%", height, TR.WIDTH);
      }
    };

    _this.wasCompleted = false;
    _this.idCompleted = null;
    _this.wasOpacied = false;
    _this.idOpacied = null;
    return _this;
  }

  var _proto = ProgressLine.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.idCompleted) {
      clearTimeout(this.idCompleted);
    }

    if (this.idOpacied) {
      clearTimeout(this.idOpacied);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
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
  };

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        height = _this$props.height,
        _style = this._crLineStyle(color, height);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: CL,
      style: _style
    });
  };

  return ProgressLine;
}(_react.Component);

ProgressLine.defaultProps = {
  color: DF_COLOR,
  height: 3
};
var _default = ProgressLine;
exports["default"] = _default;
//# sourceMappingURL=ProgressLine.js.map