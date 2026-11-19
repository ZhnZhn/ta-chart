import { SvgX } from './Svg';

const CL_SVG_CLOSE = "svg-close"
, S_SVG_X = {
  padding: 3,
  stroke: '#f44336'
};

const SvgClose = ({
  style,
  tabIndex=-1,
  onClick
}) => (
   <button
     className={CL_SVG_CLOSE}
     style={style}
     tabIndex={tabIndex}
     onClick={onClick}
   >
     <SvgX style={S_SVG_X} />
   </button>
);

export default SvgClose
