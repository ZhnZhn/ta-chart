import { useContext, useRef, useState } from 'react'

import AppValue from '../../contexts/AppValue'

import InputText from '../../zhn/InputText'
import FlatButton from '../../zhn-m/FlatButton'
import BackMenuBt from '../BackMenuBt'

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
  padding: '8px 0'
}
, S_BTS = {
  float: 'right',
  padding: '6px 22px 0 0'
};


const PageSetting = ({
  style,
  onPrevPage
}) => {
  const { appSettings } = useContext(AppValue)
  , refInput = useRef()
  , [proxyKey, forceUpdate] = useState(0)
  , onEnterProxy = (str) => {
     appSettings.proxy(str)
  }
  , onApply = () => {
     appSettings.proxy(refInput.current.getValue())
  }
  , onRestore = () => {
     appSettings.restoreProxy()
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
          ref={refInput}
          style={S_INPUT}
          initValue={_proxy}
          onEnter={onEnterProxy}
        />
        <div style={S_BTS}>
          <FlatButton
            caption="Restore"
            onClick={onRestore}
          />
          <FlatButton
            caption="Apply"
            onClick={onApply}
          />
        </div>
      </div>
    </div>
  );
}

export default PageSetting
