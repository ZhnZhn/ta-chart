import { useContext, useRef, useState } from 'react'

import AppValue from '../../contexts/AppValue'

import InputText from '../../zhn/InputText'
import FlatButton from '../../zhn-m/FlatButton'
import BackMenuBt from '../BackMenuBt'

const S = {
  PAGE: {
    paddingLeft: 4
  },
  LABEL: {
    display: 'inline-block',
    paddingLeft: 8,
    paddingBottom: 4,
    color: '#265782',
    fontWeight: 'bold'
  },
  INPUT: {
    display: 'block',
    width: '92%',
    height: 32,
    paddingTop: 8,
    paddingBottom: 8
  },
  BTS: {
    float: 'right',
    paddingTop: 6,
    paddingRight: 22
  }
}

const PageSetting = ({ style, onPrevPage }) => {
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
  , _proxy = appSettings.proxy()
  return (
    <div style={{ ...S.PAGE, ...style }}>
      <BackMenuBt onClick={onPrevPage} />
      <div>
        <span style={S.LABEL}>
          Proxy Server
        </span>
        <InputText
          key={proxyKey}
          ref={refInput}
          style={S.INPUT}
          initValue={_proxy}
          onEnter={onEnterProxy}
        />
        <div style={S.BTS}>
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
