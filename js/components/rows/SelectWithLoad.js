"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _RowInputSelect = _interopRequireDefault(require("./RowInputSelect"));
var _loadOptions = _interopRequireDefault(require("./loadOptions"));
var _jsxRuntime = require("react/jsx-runtime");
const SelectWithLoad = props => {
  const {
      optionURI
    } = props,
    [options, setOptions] = (0, _uiApi.useState)([]),
    [isLoading, setIsLoading] = (0, _uiApi.useState)(false),
    [isLoadingFailed, setIsLoadingFailed] = (0, _uiApi.useState)(false);
  const _onLoadOptions = () => (0, _loadOptions.default)({
    uri: optionURI,
    setOptions,
    setIsLoading,
    setIsLoadingFailed
  });
  (0, _uiApi.useEffect)(_onLoadOptions, [optionURI]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
    ...props,
    options: options,
    isLoading: isLoading,
    isLoadingFailed: isLoadingFailed,
    onLoadOption: _onLoadOptions
  });
};
var _default = SelectWithLoad;
exports.default = _default;
//# sourceMappingURL=SelectWithLoad.js.map