import { SvgArrowDown } from '../zhn/Svg';

import { CL_BT_ARROW } from './CL';

const S_SVG_OPEN = {
  color: "#1b75bb"
}
, S_SVG_CLOSE = {
  color: "#858585"
};

const ArrowCell = (
  props
) => (
  <button
    aria-label="Toggle suggestions"
    type="button"
    className={CL_BT_ARROW}
    tabIndex="-1"
    onClick={props.onClick}
  >
    <SvgArrowDown
      style={props.isShowOption
        ? S_SVG_OPEN
        : S_SVG_CLOSE
      }
    />
  </button>
);

export default ArrowCell
