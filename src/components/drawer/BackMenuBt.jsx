import FlatButton from '../zhn-m/FlatButton'

const CL = {
  BT: 'drawer__list-bt'
}

const BackMenuBt = ({ onClick }) => (
  <FlatButton
    className={CL.BT}
    caption="< Menu"
    onClick={onClick}
  />
);

export default BackMenuBt
