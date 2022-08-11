import InputSelect from '../zhn-select/InputSelect';
import {
  crRowLabelStyle,
  crCaption
} from '../styles/DialogStyles';

const WIDTH = 270;

const RowInputSelect = ({
  isShowLabels=true,
  caption='',
  captionStyle,
  ...restProps
}) => {
  const _caption = crCaption(caption)
  , [
      rowStyle,
      labelStyle
    ]  = crRowLabelStyle(isShowLabels)
  , optionName = isShowLabels
     ? ''
     : caption.replace(':', '')
  , _options = {
      width: WIDTH,
      ...restProps,
      optionName
    };
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
