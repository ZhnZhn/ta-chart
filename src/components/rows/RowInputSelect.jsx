import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

const WIDTH = "270";

const RowInputSelect = ({
  isShowLabels=true, caption='', captionStyle, ...rest
}) => {
  const _caption = caption.indexOf(':') === -1 && caption !== ''
           ? `${caption}:`
           : caption
       , {
           rowStyle, labelStyle
         } = STYLE.crRowLabelStyle(isShowLabels)
       , optionName = isShowLabels
            ? ''
            : caption.replace(':', '')
       , _options = { width: WIDTH, ...rest, optionName};
  return (
     <div style={rowStyle}>
        <span style={{...labelStyle, ...captionStyle}}>
           {_caption}
        </span>
        <InputSelect {..._options} />
    </div>
  );
};


export default RowInputSelect
