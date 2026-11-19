import FlatButton from '../zhn-m/FlatButton';
import { SvgArrowLeft } from '../zhn/Svg';

const CL_DRAWER_LIST_BT = 'drawer__list-bt'
, S_SVG_ARROW_LEFT = {
  verticalAlign: 'text-bottom'
};

const svgComp = (
  <SvgArrowLeft
    style={S_SVG_ARROW_LEFT}
  />
);

const BackMenuBt = (
  props
) => (
  <FlatButton
    className={CL_DRAWER_LIST_BT}
    svgComp={svgComp}
    caption="Menu"
    onClick={props.onClick}
  />
);

export default BackMenuBt
