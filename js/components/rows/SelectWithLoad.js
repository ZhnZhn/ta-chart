'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _loadOptions = require('./loadOptions');

var _loadOptions2 = _interopRequireDefault(_loadOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectWithLoad = function SelectWithLoad(props) {
  var optionURI = props.optionURI,
      _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray3.default)(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1],
      _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray3.default)(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1],
      _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray3.default)(_useState5, 2),
      isLoadingFailed = _useState6[0],
      setIsLoadingFailed = _useState6[1];


  var _onLoadOptions = function _onLoadOptions() {
    return (0, _loadOptions2.default)({
      uri: optionURI,
      setOptions: setOptions, setIsLoading: setIsLoading, setIsLoadingFailed: setIsLoadingFailed
    });
  };

  (0, _react.useEffect)(_onLoadOptions, [optionURI]);

  return _react2.default.createElement(_RowInputSelect2.default, (0, _extends3.default)({}, props, {
    options: options,
    isLoading: isLoading,
    isLoadingFailed: isLoadingFailed,
    onLoadOption: _onLoadOptions
  }));
};

exports.default = SelectWithLoad;
//# sourceMappingURL=SelectWithLoad.js.map