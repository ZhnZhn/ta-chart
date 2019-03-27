import React, { useContext } from 'react'

import AppValue from '../contexts/AppValue'

import SvgClose from '../zhn/SvgClose'
import BtTriple from '../zhn/BtTriple'
import setBodyStyle from './setBodyStyle'

const CL = {
  TITLE: 'drawer__title'
};

const S = {
  TITLE: {
    paddingTop: 12,
    paddingBottom: 8
  },
  BT_TRIPLE: {
    marginRight: 8
  },
  BT_CLOSE: {
    position: 'relative',
    top: 4
  },
}

const DrawerTitle = ({ onClose, setThemeId }) => {
  const { theme } = useContext(AppValue);

  const _onClick = (value) => {
    setBodyStyle(theme.getBgColor(value))
    setThemeId(value)
  };

  return (
    <div
      className={CL.TITLE}
      style={S.TITLE}
    >
      <BtTriple
        style={S.BT_TRIPLE}
        oneC="GREY"
        twoC="LIGHT"
        threeC="SAND"
        onClick={_onClick}
      />
      <SvgClose
        style={S.BT_CLOSE}
        onClick={onClose}
      />
    </div>
  );
}

export default DrawerTitle
