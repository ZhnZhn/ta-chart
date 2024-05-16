"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const S_INPUT_TEXT = {
    display: 'inline',
    color: 'green',
    height: 26,
    width: 40,
    paddingLeft: 5,
    margin: '0 5px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'medium none',
    outline: 'medium none',
    background: 'transparent none repeat scroll 0 0',
    backgroundColor: '#e1e1cb'
  },
  C_BLANK = '',
  C_TEXT = 'text',
  ON = 'on',
  OFF = 'off',
  FN_NOOP = () => {};
const InputText = _ref => {
  let {
    refEl,
    initValue,
    style,
    spellCheck,
    placeholder,
    type = C_TEXT,
    maxLenght = 125,
    onEnter = FN_NOOP
  } = _ref;
  const _refInput = (0, _uiApi.useRef)(),
    [value, setValue] = (0, _uiApi.useState)(() => initValue != null ? initValue : C_BLANK),
    _hInputChange = (0, _uiApi.useCallback)(event => {
      const {
        value
      } = event.target;
      if (value.length <= maxLenght) {
        setValue(value);
      }
    }, [maxLenght])
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hKeyDown = (0, _uiApi.useCallback)(event => {
      switch (event.keyCode) {
        case 27:
        case 46:
          event.preventDefault();
          setValue(C_BLANK);
          break;
        case 13:
          onEnter(event.target.value);
          break;
        default:
          return;
      }
    }, []);
  // onEnter
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValue: () => (_refInput.current || {}).value,
    setValue: value => setValue(value)
  }), []);
  const _autoCorrect = spellCheck ? ON : OFF,
    _spellCheck = spellCheck ? true : false;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
    ref: _refInput,
    style: {
      ...S_INPUT_TEXT,
      ...style
    },
    type: type,
    name: C_TEXT,
    autoCapitalize: OFF,
    autoComplete: OFF,
    autoCorrect: _autoCorrect,
    spellCheck: _spellCheck,
    translate: "false",
    value: value,
    placeholder: placeholder,
    maxLength: maxLenght,
    onChange: _hInputChange,
    onKeyDown: _hKeyDown
  });
};
var _default = exports.default = InputText;
//# sourceMappingURL=InputText.js.map