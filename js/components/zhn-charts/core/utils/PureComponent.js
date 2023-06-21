"use strict";

exports.__esModule = true;
exports.PureComponent = void 0;
var _uiApi = require("../../../uiApi");
var _shallowEqual = require("./shallowEqual");
class PureComponent extends _uiApi.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(0, _shallowEqual.shallowEqual)(this.props, nextProps) || !(0, _shallowEqual.shallowEqual)(this.state, nextState) || !(0, _shallowEqual.shallowEqual)(this.context, nextContext);
  }
}
exports.PureComponent = PureComponent;
//# sourceMappingURL=PureComponent.js.map