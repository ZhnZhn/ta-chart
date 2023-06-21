import { useContext } from '../uiApi';

import AppValue from '../contexts/AppValue';

import SvgClose from '../zhn/SvgClose';
import BtTriple from '../zhn/BtTriple';
import setBodyStyle from './setBodyStyle';

const CL_DRAWER_TITLE = 'drawer__title';

const S_TITLE = {
  paddingTop: 12,
  paddingBottom: 8
}
, S_BT_TRIPLE = {
  marginRight: 8
}
, S_BT_CLOSE = {
  position: 'relative',
  top: 4
};

const DrawerTitle = ({
  onClose,
  setThemeId
}) => {
  const { theme } = useContext(AppValue)
  , _onClick = (value) => {
    setBodyStyle(theme.getBgColor(value))
    setThemeId(value)
  };

  return (
    <div
      className={CL_DRAWER_TITLE}
      style={S_TITLE}
    >
      <BtTriple
        style={S_BT_TRIPLE}
        oneC="GREY"
        twoC="LIGHT"
        threeC="SAND"
        onClick={_onClick}
      />
      <SvgClose
        style={S_BT_CLOSE}
        onClick={onClose}
      />
    </div>
  );
}

export default DrawerTitle
