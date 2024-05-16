import {
  useContext,
  useRef,
  useState,
  getRefValue
} from '../../uiApi';

import AppValue from '../../contexts/AppValue';

import InputText from '../../zhn/InputText';
import FlatButton from '../../zhn-m/FlatButton';
import BackMenuBt from '../BackMenuBt';

const S_PAGE = { paddingLeft: 4 }
, S_LABEL = {
  color: '#265782',
  display: 'inline-block',
  padding: '0 0 4px 8px',
  fontWeight: 'bold'
}
, S_INPUT = {
  display: 'block',
  width: '92%',
  height: 32,
  padding: '8px 0 8px 4px'
}
, S_BTS = {
  float: 'right',
  padding: '6px 22px 0 0'
}
, LOCALHOST = 'http://127.0.0.1'
, _isStr = str => typeof str === 'string';

const _isLocalProxy = str => _isStr(str)
  ? str.indexOf(LOCALHOST) !== -1
  : false;

const PageSetting = ({
  style,
  onPrevPage
}) => {
  const { appSettings } = useContext(AppValue)
  , refInput = useRef()
  , [proxyKey, forceUpdate] = useState(0)
  , onEnterProxy = (str) => {
     if (_isLocalProxy(str)) {
       appSettings.proxy(str)
     } else {
       getRefValue(refInput).setValue('')
     }
  }
  , onApply = () => {
     const _input = getRefValue(refInput)
     , _proxyValue = _input.getValue()
     if (_isLocalProxy(_proxyValue)) {
       appSettings.proxy(_proxyValue)
     } else {
       _input.setValue('')
     }
  }
  , onClear = () => {
     appSettings.clearProxy()
     forceUpdate(n => n+1)
  }
  , _proxy = appSettings.proxy();

  return (
    <div style={{...S_PAGE, ...style}}>
      <BackMenuBt onClick={onPrevPage} />
      <div>
        <span style={S_LABEL}>
          Local Proxy Server
        </span>
        <InputText
          key={proxyKey}
          refEl={refInput}
          style={S_INPUT}
          initValue={_proxy}
          placeholder={LOCALHOST}
          onEnter={onEnterProxy}
        />
        <div style={S_BTS}>
          <FlatButton
            caption="Clear"
            onClick={onClear}
          />
          <FlatButton
            caption="Apply"
            onClick={onApply}
          />
        </div>
      </div>
    </div>
  );
};

export default PageSetting
