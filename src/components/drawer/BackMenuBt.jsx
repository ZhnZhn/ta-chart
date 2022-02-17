import FlatButton from '../zhn-m/FlatButton';

const CL_DRAWER_LIST_BT = 'drawer__list-bt';

const BackMenuBt = ({ onClick }) => (
  <FlatButton
    className={CL_DRAWER_LIST_BT}
    caption="< Menu"
    onClick={onClick}
  />
);

export default BackMenuBt
