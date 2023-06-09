import {
  Component,
  createRef,
  getRefValue
} from '../../uiApi';

import { mean } from '../d3Array';
import {
  select,
  pointer
} from 'd3-selection';

import {
  d3Window,
  sign,
  first,
  last,
  mousePosition,
  touchPosition,
  getTouchProps,
  MOUSEUP,
  MOUSEMOVE,
  TOUCHEND,
  TOUCHMOVE
} from '../core/utils';
import {
  CL_DEFAULT_CURSOR,
  CL_ENABLE_INTERACTION
} from '../CL';

class AxisZoomCapture extends Component {
    ref = createRef();

    clicked = false;
    dragHappened = false;

    state = {
      startPosition: null
    };

    handleDragEnd = (e) => {
        const container = getRefValue(this.ref);
        if (!container) {
          return;
        }

        if (!this.dragHappened) {
          if (this.clicked) {
            const mouseXY = pointer(e, container)
            , { onDoubleClick } = this.props;
            if (onDoubleClick !== undefined) {
               onDoubleClick(e, mouseXY);
            }
          } else {
            this.clicked = true;
            setTimeout(() => {
                this.clicked = false;
            }, 300);
          }
        }

        select(d3Window(container))
          .on(MOUSEMOVE, null)
          .on(MOUSEUP, null)
          .on(TOUCHMOVE, null)
          .on(TOUCHEND, null);
        this.setState({
          startPosition: null
        });
    }

    handleDrag = (e) => {
      const container = getRefValue(this.ref);
      if (!container) {
        return;
      }

      this.dragHappened = true;
      const {
        getMouseDelta,
        inverted
      } = this.props
      , {
        startPosition
      } = this.state;
      if (startPosition !== null) {
        const {
          startScale,
          startXY
        } = startPosition
        , mouseXY = pointer(e, container)
        , diff = getMouseDelta(startXY, mouseXY)
        , center = mean(startScale.range());
        if (center === undefined) {
          return;
        }

        const tempRange = startScale
          .range()
          .map(d => (inverted
             ? d - sign(d - center) * diff
             : d + sign(d - center) * diff
          ))
        , newDomain = tempRange.map(startScale.invert);
        if (sign(last(startScale.range()) - first(startScale.range())) === sign(last(tempRange) - first(tempRange))) {
          const { axisZoomCallback } = this.props;
          if (axisZoomCallback !== undefined) {
            axisZoomCallback(newDomain);
          }
        }
      }
    }

    handleDragStartTouch = (event) => {
        const container = getRefValue(this.ref);
        if (!container) {
           return;
        }

        this.dragHappened = false;
        const startScale = this.props.getScale();
        if (event.touches.length === 1 && startScale.invert !== undefined) {
          select(d3Window(container))
            .on(TOUCHMOVE, this.handleDrag)
            .on(TOUCHEND, this.handleDragEnd);
          const startXY = touchPosition(getTouchProps(event.touches[0]), event);
          this.setState({
            startPosition: {
              startScale,
              startXY
            }
          });
        }
    }

    handleDragStartMouse = (event) => {
      event.preventDefault();

      const container = getRefValue(this.ref);
      if (!container) {
        return;
      }

      this.dragHappened = false;
      const startScale = this.props.getScale();
      if (startScale.invert !== undefined) {
        select(d3Window(container))
          .on(MOUSEMOVE, this.handleDrag, false)
          .on(MOUSEUP, this.handleDragEnd, false);
        const startXY = mousePosition(event);
        this.setState({
          startPosition: {
            startXY,
            startScale
          }
        });
      }
    }

    handleRightClick = (event) => {
      event.stopPropagation();
      event.preventDefault();

      const container = getRefValue(this.ref)
      , { onContextMenu } = this.props;
      if (!container || !onContextMenu) {
        return;
      }

      const defaultRect = container.getBoundingClientRect()
      , mouseXY = mousePosition(event, defaultRect);
      select(d3Window(container))
        .on(MOUSEMOVE, null)
        .on(MOUSEUP, null);
      this.setState({
        startPosition: null
      });
      onContextMenu(event, mouseXY);
    };

    render() {
        const {
          bg,
          className,
          zoomCursorClassName
        } = this.props
        , cursorCn = this.state.startPosition === null
           ? CL_DEFAULT_CURSOR
           : zoomCursorClassName || '';

        return (
          <rect
            ref={this.ref}
            className={`${CL_ENABLE_INTERACTION} ${cursorCn} ${className}`}
            x={bg.x} y={bg.y}
            height={bg.h}
            width={bg.w}
            opacity={0}
            onContextMenu={this.handleRightClick}
            onMouseDown={this.handleDragStartMouse}
            onTouchStart={this.handleDragStartTouch}
         />);
    }
}

AxisZoomCapture.defaultProps = {
  inverted: true,
  className: ''
}

export default AxisZoomCapture
