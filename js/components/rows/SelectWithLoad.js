"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));

var _loadOptions = _interopRequireDefault(require("./loadOptions"));

var SelectWithLoad = function SelectWithLoad(props) {
  var optionURI = props.optionURI,
      _useState = (0, _react.useState)([]),
      options = _useState[0],
      setOptions = _useState[1],
      _useState2 = (0, _react.useState)(false),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1],
      _useState3 = (0, _react.useState)(false),
      isLoadingFailed = _useState3[0],
      setIsLoadingFailed = _useState3[1];

  var _onLoadOptions = function _onLoadOptions() {
    return (0, _loadOptions["default"])({
      uri: optionURI,
      setOptions: setOptions,
      setIsLoading: setIsLoading,
      setIsLoadingFailed: setIsLoadingFailed
    });
  };

  (0, _react.useEffect)(_onLoadOptions, [optionURI]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], (0, _extends2["default"])({}, props, {
    options: options,
    isLoading: isLoading,
    isLoadingFailed: isLoadingFailed,
    onLoadOption: _onLoadOptions
  }));
};

var _default = SelectWithLoad;
exports["default"] = _default;
//# sourceMappingURL=SelectWithLoad.js.map