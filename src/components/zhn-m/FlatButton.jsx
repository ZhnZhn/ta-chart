import { Component } from 'react'

import crCn from '../zhn-utils/crCn';
import CaptionInput from './CaptionInput'

const CL_BT_FLAT = 'bt-flat'
, CL_BT_FLAT_DIV = 'bt-flat__div'
, CL_BT_FLAT_SPAN = 'bt-flat__span'
, S_PRIMARY = { color: '#607d8b' };

const POINTER_EVENTS = 'pointer-events';

class FlatButton extends Component {

  static defaultProps = {
    timeout: 500
  }

  _setPointerEvents = (value='auto') => {
    if (this && this.rootNode && this.rootNode.style) {
       this.rootNode.style[POINTER_EVENTS] = value
    }
  }

  _hClick = (event) => {
    this._setPointerEvents('none')
    const { timeout, onClick } = this.props;
    setTimeout(this._setPointerEvents, timeout)
    onClick(event)
  }

  _refNode = node => this.rootNode = node

  render() {
    const {
           className,
           rootStyle,
           clDiv=CL_BT_FLAT_DIV,
           clCaption,
           isPrimary,
           title='',
           caption,
           accessKey,
           children
          } = this.props
        , _style = isPrimary
             ? {...rootStyle, ...S_PRIMARY}
             : rootStyle
        , _className = crCn(CL_BT_FLAT, className)
        , _clCaption = crCn(CL_BT_FLAT_SPAN, clCaption)
        , _title = accessKey
             ? `${title} [${accessKey}]`
             : title;
  return (
    <button
      ref = {this._refNode}
      className={_className}
      style={_style}
      accessKey={accessKey}
      tabIndex={0}
      title={_title}
      onClick={this._hClick}
    >
      <div className={clDiv}>
        <CaptionInput
          className={_clCaption}
          caption={caption}
          accessKey={accessKey}
        />
        {children}
      </div>
    </button>
  );
 }

 focus(){
   this.rootNode.focus()
 }

}

export default FlatButton
