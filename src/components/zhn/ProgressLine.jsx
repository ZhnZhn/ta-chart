
import React, { Component } from 'react'

const CL = 'progress-line';
const DF_COLOR = '#2f7ed8';


const TR = {
  WIDTH: 'width 500ms ease-out',
  OPACITY: 'opacity 400ms linear'
};

const _crStyle = (
  backgroundColor,
  opacity,
  width,
  height,
  transition
) => ({
  backgroundColor,
  opacity,
  width,
  height,
  transition
});

class ProgressLine extends Component {
  static defaultProps = {
    color: DF_COLOR,
    height: 3
  }

  constructor(props){
    super(props);
    this.wasCompleted = false;
    this.idCompleted = null;
    this.wasOpacied = false;
    this.idOpacied = null;
  }

  componentWillUnmount(){
    if (this.idCompleted){
      clearTimeout(this.idCompleted)
    }
    if (this.idOpacied){
      clearTimeout(this.idOpacied)
    }
  }

  componentDidUpdate(){
    if (this.wasCompleted){
      this.idCompleted = setTimeout(()=>{
        this.idCompleted = null;
        this.forceUpdate();
      }, 800)
    } else if (this.wasOpacied){
      this.idOpacied = setTimeout(()=>{
        this.idOpacied = null;
        this.forceUpdate();
      }, 800)
    }
  }

  _crLineStyle = (color, height) => {
    if (this.wasOpacied) {
      this.wasOpacied = false;
      return _crStyle(color, 1, 0, height);
    } else if (this.wasCompleted) {
      this.wasCompleted = false;
      this.wasOpacied = true;
      return _crStyle(color, 0, '100%', height, TR.OPACITY);
    } else {
       let { completed } = this.props;
       if (completed < 0) {
         completed = 0;
       } else if (completed >= 100) {
         completed = 100;
         this.wasCompleted = true
       }
       return _crStyle(color, 1, `${completed}%`, height, TR.WIDTH);
    }
  }

  render(){
    const { color, height } = this.props
    , _style = this._crLineStyle(color, height);

    return (
      <div className={CL} style={_style} />
    );
  }
}

export default ProgressLine
