"use strict";

exports.__esModule = true;
exports.default = fitWidth;
var _uiApi = require("../../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const mathRound = Math.round,
  mathMax = Math.max;
const _getRatio = canvasEl => {
  if (canvasEl != null) {
    const context = canvasEl.getContext("2d"),
      devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;
    return ratio;
  }
  return 1;
};
const _getParentNode = el => (el || {}).parentNode || window;
const _calcWidth = (el, minWidth) => {
  const {
      width,
      paddingLeft,
      paddingRight
    } = window.getComputedStyle(_getParentNode(el)),
    w = parseFloat(width) - (parseFloat(paddingLeft) + parseFloat(paddingRight));
  return mathRound(mathMax(w, minWidth));
};
const _getDisplayName = Series => Series.displayName || Series.name || "Series";
function fitWidth(WrappedComponent, withRef, minWidth) {
  if (withRef === void 0) {
    withRef = true;
  }
  if (minWidth === void 0) {
    minWidth = 100;
  }
  class ResponsiveComponent extends _uiApi.Component {
    constructor() {
      super(...arguments);
      this.state = {};
      this.saveNode = node => {
        this.node = node;
      };
      this.setTestCanvas = node => {
        this.testCanvas = node;
      };
      this._hWindowResize = () => {
        this.setState({
          width: _calcWidth(_getParentNode(this.testCanvas), minWidth)
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
      this.getWrappedInstance = () => {
        return this.node;
      };
    }
    componentDidMount() {
      window.addEventListener("resize", this._hWindowResize);
      this._hWindowResize();
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({
        ratio: _getRatio(this.testCanvas)
      });
      /* eslint-enable react/no-did-mount-set-state */
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this._hWindowResize);
    }
    render() {
      const {
          width,
          ratio
        } = this.state,
        ref = withRef ? {
          ref: this.saveNode
        } : {};
      return width ? /*#__PURE__*/(0, _jsxRuntime.jsx)(WrappedComponent, {
        width: width,
        ratio: ratio,
        ...this.props,
        ...ref
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...ref,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("canvas", {
          ref: this.setTestCanvas
        })
      });
    }
  }
  ResponsiveComponent.displayName = "fitWidth(" + _getDisplayName(WrappedComponent) + ")";
  return ResponsiveComponent;
}
//# sourceMappingURL=fitWidth.js.map