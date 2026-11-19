import { SvgX } from '../zhn/Svg';

import {
  CL_FOOTER,
  CL_NOT_SELECTED,
  CL_FOOTER_BTS,
  CL_FOOTER_INDEX,
  CL_FOOTER_MARGIN
} from './CL';

const S_BT_X = {
  backgroundColor: '#e1e1cb',
  height: '32px',
  padding: '8px',
  stroke: "#1b75bb",
  borderRadius: '50%'
};;

const OptionsFooter = (
  props
) => (
  <div className={`${CL_FOOTER} ${CL_NOT_SELECTED}`}>
    <span className={CL_FOOTER_INDEX}>
      <span ref={props.refIndexActive}>
        {props.indexActiveOption}
      </span>
      <span>
         : {props.nFiltered}: {props.nAll}
      </span>
    </span>
    <span className={CL_FOOTER_BTS}>
      <button
        type="button"
        aria-label="Clear input and close options"
        style={S_BT_X}
        onClick={props.onClear}
      >
        <SvgX />
      </button>
    </span>
  </div>
);

export default OptionsFooter
