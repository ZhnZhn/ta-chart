"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = fitWidth;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _jsxRuntime = require("react/jsx-runtime");

var _getRatio = function _getRatio(canvasEl) {
  if (canvasEl != null) {
    var context = canvasEl.getContext("2d"),
        devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
        ratio = devicePixelRatio / backingStoreRatio;
    return ratio;
  }

  return 1;
};

var _getParentNode = function _getParentNode(el) {
  var _ref = el || {},
      parentNode = _ref.parentNode;

  return parentNode || window;
};

var _calcWidth = function _calcWidth(el, minWidth) {
  var _window$getComputedSt = window.getComputedStyle(_getParentNode(el)),
      width = _window$getComputedSt.width,
      paddingLeft = _window$getComputedSt.paddingLeft,
      paddingRight = _window$getComputedSt.paddingRight,
      w = parseFloat(width) - (parseFloat(paddingLeft) + parseFloat(paddingRight));

  return Math.round(Math.max(w, minWidth));
};

function getDisplayName(Series) {
  var name = Series.displayName || Series.name || "Series";
  return name;
}

function fitWidth(WrappedComponent, withRef, minWidth) {
  if (withRef === void 0) {
    withRef = true;
  }

  if (minWidth === void 0) {
    minWidth = 100;
  }

  var ResponsiveComponent = /*#__PURE__*/function (_Component) {
    (0, _inheritsLoose2["default"])(ResponsiveComponent, _Component);

    function ResponsiveComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this;
      _this.state = {};

      _this.saveNode = function (node) {
        _this.node = node;
      };

      _this.setTestCanvas = function (node) {
        _this.testCanvas = node;
      };

      _this._hWindowResize = function () {
        _this.setState({
          width: _calcWidth(_getParentNode(_this.testCanvas), minWidth)
        });
        /*
        this.setState({
        width: 0
        }, () => {
        this.setState({
            width: _calcWidth(_getParentNode(this.testCanvas), minWidth)
        });
        });
        */

      };

      _this.getWrappedInstance = function () {
        return _this.node;
      };

      return _this;
    }

    var _proto = ResponsiveComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      window.addEventListener("resize", this._hWindowResize);

      this._hWindowResize();
      /* eslint-disable react/no-did-mount-set-state */


      this.setState({
        ratio: _getRatio(this.testCanvas)
      });
      /* eslint-enable react/no-did-mount-set-state */
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      window.removeEventListener("resize", this._hWindowResize);
    };

    _proto.render = function render() {
      var _this$state = this.state,
          width = _this$state.width,
          ratio = _this$state.ratio,
          ref = withRef ? {
        ref: this.saveNode
      } : {};
      return width ? /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, (0, _extends2["default"])({
        width: width,
        ratio: ratio
      }, this.props, ref)) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", (0, _extends2["default"])({}, ref, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
          ref: this.setTestCanvas
        })
      }));
    };

    return ResponsiveComponent;
  }(_react.Component);

  ResponsiveComponent.displayName = "fitWidth(" + getDisplayName(WrappedComponent) + ")";
  return ResponsiveComponent;
}
//# sourceMappingURL=fitWidth.js.map