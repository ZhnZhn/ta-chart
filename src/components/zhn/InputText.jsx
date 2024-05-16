import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle
} from '../uiApi';

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
  backgroundColor: '#e1e1cb',
}
, C_BLANK = ''
, C_TEXT = 'text'
, ON = 'on'
, OFF = 'off'
, FN_NOOP = () => {};

const InputText = ({
  refEl,
  initValue,
  style,
  spellCheck,
  placeholder,
  type=C_TEXT,
  maxLenght=125,
  onEnter=FN_NOOP
}) => {
  const _refInput = useRef()
  , [
    value,
    setValue
  ] = useState(
    () => initValue != null ? initValue : C_BLANK
  )
  , _hInputChange = useCallback(event => {
      const { value } = event.target;
      if (value.length <= maxLenght) {
        setValue(value)
      }
    }, [maxLenght])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hKeyDown = useCallback(event => {
     switch(event.keyCode){
       case 27: case 46:
          event.preventDefault()
          setValue(C_BLANK )
          break;
       case 13:
          onEnter(event.target.value)
          break;
       default: return;
     }
   }, []);
  // onEnter
  /*eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(refEl, () => ({
    getValue: () => (_refInput.current || {}).value,
    setValue: value => setValue(value)
  }), [])

  const _autoCorrect = spellCheck
       ? ON
       : OFF
  , _spellCheck = spellCheck
       ? true
       : false;

  return (
    <input
      ref={_refInput}
      style={{...S_INPUT_TEXT, ...style}}
      type={type}
      name={C_TEXT}
      autoCapitalize={OFF}
      autoComplete={OFF}
      autoCorrect={_autoCorrect}
      spellCheck={_spellCheck}
      translate="false"
      value={value}
      placeholder={placeholder}
      maxLength={maxLenght}
      onChange={_hInputChange}
      onKeyDown={_hKeyDown}
    />
  );
};

export default InputText
