import React from "react";

import {
  pointer,
  pointers,
  select
} from '../d3Selection';

import {
  d3Window,
  getTouchProps,
  mousePosition,
  touchPosition,

  MOUSEENTER,
  MOUSELEAVE,
  MOUSEMOVE,
  MOUSEUP,

  TOUCHEND,
  TOUCHMOVE,

  WHEEL
} from './utils';
import {
  getCurrentCharts
} from './utils/ChartDataUtil';
import {
  CL_GRABBING_CURSOR,
  CL_CROSSHAIR_CURSOR
} from '../CL';

const _addMouseMoveHandleIfPanOrDragNotInProgress = (
  state,
  ref,
  handleMouseMove=null
) => {
  if (!state.panInProgress && !state.dragInProgress) {
    select(d3Window(ref.current))
      .on(MOUSEMOVE, handleMouseMove);
  }
};

export class EventCapture extends React.Component {
    static defaultProps = {
        mouseMove: false,
        zoom: false,
        pan: false,
        panSpeedMultiplier: 1,
        focus: false,
        disableInteraction: false,
    };

    clicked;
    dx = 0;
    dy = 0;
    dragHappened;
    focus;
    lastNewPos;
    mouseInside = false;
    mouseInteraction = true;
    panEndTimeout;
    panHappened;

    ref = React.createRef();

    constructor(props) {
        super(props);
        this.focus = props.focus;
        this.state = {
            panInProgress: false,
        };
    }
    componentDidMount() {
      const {
        disableInteraction
      } = this.props
      , {
        current
      } = this.ref;
      if (current === null) {
        return;
      }
      if (!disableInteraction) {
        select(current)
          .on(MOUSEENTER, this.handleEnter)
          .on(MOUSELEAVE, this.handleLeave)
          .on(WHEEL, this.handleWheel, { passive: false })
      }
    }

    componentDidUpdate() {
      this.componentDidMount();
    }

    componentWillUnmount() {
        const { disableInteraction } = this.props;
        const { current } = this.ref;
        if (current === null) {
            return;
        }
        if (!disableInteraction) {
            select(current)
              .on(MOUSEENTER, null)
              .on(MOUSELEAVE, null)
              .on(WHEEL, null, { passive: false })
            select(d3Window(current))
              .on(MOUSEMOVE, null);
        }
    }

    handleEnter = (e) => {
        const { onMouseEnter } = this.props;
        if (onMouseEnter === undefined) {
          return;
        }
        this.mouseInside = true;
        _addMouseMoveHandleIfPanOrDragNotInProgress(
          this.state,
          this.ref,
          this.handleMouseMove
        )
        onMouseEnter(e);
    };

    handleLeave = (e) => {
        const { onMouseLeave } = this.props;
        if (onMouseLeave === undefined) {
          return;
        }
        this.mouseInside = false;
        _addMouseMoveHandleIfPanOrDragNotInProgress(
          this.state,
          this.ref
        )
        onMouseLeave(e);
    };

    handleWheel = (e) => {
        const {
          pan,
          onPan,
          zoom,
          onZoom
        } = this.props;
        if (!pan && !zoom) {
          return;
        }

        const { panInProgress } = this.state
        , yZoom = Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 0
        , mouseXY = mousePosition(e);

        e.preventDefault();
        if (zoom && this.focus && yZoom && !panInProgress) {
            const zoomDir = e.deltaY > 0
              ? 1
              : -1;
            if (onZoom !== undefined) {
              onZoom(zoomDir, mouseXY, e);
            }
        } else if (this.focus) {
            if (this.shouldPan() && this.state.panStart !== undefined) {
                // pan already in progress
                const {
                  panStartXScale,
                  chartsToPan
                } = this.state.panStart;
                this.lastNewPos = mouseXY;
                this.panHappened = true;
                if (this.dx === undefined) {
                  this.dx = 0;
                }
                if (this.dy === undefined) {
                  this.dy = 0;
                }
                this.dx -= e.deltaX;
                this.dy += e.deltaY;
                const dxdy = { dx: this.dx, dy: this.dy };
                if (onPan !== undefined) {
                   onPan(mouseXY, panStartXScale, dxdy, chartsToPan, e);
                }
            } else {
                const {
                  xScale,
                  chartConfig
                } = this.props
                , currentCharts = getCurrentCharts(chartConfig, mouseXY);

                this.dx = 0;
                this.dy = 0;
                this.setState({
                  panInProgress: true,
                  panStart: {
                    panStartXScale: xScale,
                    panOrigin: mouseXY,
                    chartsToPan: currentCharts
                  }
                });
            }
            this.queuePanEnd(e);
        }
    };

    queuePanEnd(e) {
        if (this.panEndTimeout !== undefined) {
            window.clearTimeout(this.panEndTimeout);
        }
        this.panEndTimeout = window.setTimeout(() => {
            this.handlePanEnd(e);
        }, 100);
    }

    handleMouseMove = (e) => {
        const { onMouseMove, mouseMove } = this.props;
        if (onMouseMove === undefined) {
            return;
        }
        if (this.mouseInteraction && mouseMove && !this.state.panInProgress) {
            const newPos = pointer(e, this.ref.current);
            onMouseMove(newPos, "mouse", e);
        }
    }

    handleClick = (e) => {
        const mouseXY = mousePosition(e);
        const { onClick, onDoubleClick } = this.props;
        if (!this.panHappened && !this.dragHappened) {
            if (this.clicked && onDoubleClick !== undefined) {
                onDoubleClick(mouseXY, e);
                this.clicked = false;
            }
            else if (onClick !== undefined) {
                onClick(mouseXY, e);
                this.clicked = true;
                setTimeout(() => {
                    if (this.clicked) {
                        this.clicked = false;
                    }
                }, 400);
            }
        }
    }

    handleRightClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { onContextMenu, onPanEnd } = this.props;
        const mouseXY = mousePosition(e, this.ref.current.getBoundingClientRect());
        if (this.state.panStart !== undefined) {
            const { panStartXScale, panOrigin: [dx, dy], chartsToPan, } = this.state.panStart;
            if (this.panHappened && onPanEnd !== undefined) {
                onPanEnd(mouseXY, panStartXScale, { dx, dy }, chartsToPan, e);
            }
            const win = d3Window(this.ref.current);
            select(win)
              .on(MOUSEMOVE, null)
              .on(MOUSEUP, null);
            this.setState({
                panInProgress: false,
                panStart: undefined,
            });
        }
        if (onContextMenu !== undefined) {
            onContextMenu(mouseXY, e);
        }
    };
    handleDrag = (e) => {
        const { onDrag } = this.props;
        if (onDrag === undefined) {
            return;
        }
        this.dragHappened = true;
        const { dragStartPosition } = this.state;
        if (dragStartPosition === undefined) {
            return;
        }
        const mouseXY = pointer(e, this.ref.current);
        onDrag({
            startPos: dragStartPosition,
            mouseXY,
        }, e);
    };

    cancelDrag() {
      select(d3Window(this.ref.current))
        .on(MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null)
        .on(MOUSEUP, null);
      this.mouseInteraction = true;
      this.setState({
        dragInProgress: false
      });
    }

    handleDragEnd = (e) => {
      const mouseXY = pointer(e, this.ref.current);
      select(d3Window(this.ref.current))
        .on(MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null)
        .on(MOUSEUP, null);
      if (this.dragHappened) {
        const { onDragComplete } = this.props;
        if (onDragComplete !== undefined) {
          onDragComplete({ mouseXY }, e);
        }
      }
      this.mouseInteraction = true;
      this.setState({
        dragInProgress: false
      });
    };
    canPan = () => {
        const { getAllPanConditions } = this.props;
        const { pan: initialPanEnabled } = this.props;
        const { panEnabled, draggable: somethingSelected } = getAllPanConditions().reduce((returnObj, a) => {
            return {
                draggable: returnObj.draggable || a.draggable,
                panEnabled: returnObj.panEnabled && a.panEnabled,
            };
        }, {
            draggable: false,
            panEnabled: initialPanEnabled,
        });
        return {
            panEnabled,
            somethingSelected,
        };
    };
    handleMouseDown = (e) => {
      if (e.button !== 0) {
        return;
      }
      const {
        xScale,
        chartConfig,
        onMouseDown
      } = this.props;
      this.panHappened = false;
      this.dragHappened = false;
      this.focus = true;
      if (!this.state.panInProgress && this.mouseInteraction) {
        const mouseXY = mousePosition(e)
        , currentCharts = getCurrentCharts(chartConfig, mouseXY)
        , { panEnabled, somethingSelected } = this.canPan()
        , pan = panEnabled && !somethingSelected;
        if (pan) {
          this.setState({
            panInProgress: pan,
            panStart: {
              panStartXScale: xScale,
              panOrigin: mouseXY,
              chartsToPan: currentCharts
            }
          });
          select(d3Window(this.ref.current))
            .on(MOUSEMOVE, this.handlePan)
            .on(MOUSEUP, this.handlePanEnd);
        } else if (somethingSelected) {
           this.setState({
             panInProgress: false,
             dragInProgress: true,
             panStart: undefined,
             dragStartPosition: mouseXY
           });
           const { onDragStart } = this.props;
           if (onDragStart !== undefined) {
             onDragStart({ startPos: mouseXY }, e);
           }
           select(d3Window(this.ref.current))
             .on(MOUSEMOVE, this.handleDrag)
             .on(MOUSEUP, this.handleDragEnd);
        }
        if (onMouseDown !== undefined) {
          onMouseDown(mouseXY, currentCharts, e);
        }
      }
      e.preventDefault();
    };

    shouldPan = () => {
      const {
        pan: panEnabled,
        onPan
      } = this.props;
      return panEnabled && onPan && this.state.panStart !== undefined;
    };

    handlePan = (e) => {
        if (this.shouldPan() && this.state.panStart !== undefined) {
            this.panHappened = true;
            const { panStartXScale, panOrigin, chartsToPan } = this.state.panStart;
            let dx;
            let dy;
            let mouseXY;
            if (this.mouseInteraction) {
                mouseXY = pointer(e, this.ref.current);
                this.lastNewPos = mouseXY;
                dx = mouseXY[0] - panOrigin[0];
                dy = mouseXY[1] - panOrigin[1];
            }
            else {
                mouseXY = pointers(e, this.ref.current)[0];
                this.lastNewPos = mouseXY;
                dx = panOrigin[0] - mouseXY[0];
                dy = panOrigin[1] - mouseXY[1];
            }
            this.dx = dx;
            this.dy = dy;
            const { onPan } = this.props;
            if (onPan !== undefined) {
                onPan(mouseXY, panStartXScale, { dx, dy }, chartsToPan, e);
            }
        }
    };
    handlePanEnd = (e) => {
        const {
          pan: panEnabled,
          onPanEnd
        } = this.props;
        if (this.state.panStart !== undefined) {
            const {
              panStartXScale,
              chartsToPan
            } = this.state.panStart;
            select(d3Window(this.ref.current))
              .on(MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null)
              .on(MOUSEUP, null)
              .on(TOUCHMOVE, null)
              .on(TOUCHEND, null);
            if (this.panHappened && panEnabled && onPanEnd) {
                const { dx = 0, dy = 0 } = this;
                delete this.dx;
                delete this.dy;
                if (this.lastNewPos !== undefined) {
                    onPanEnd(this.lastNewPos, panStartXScale, { dx, dy }, chartsToPan, e);
                }
            }
            this.setState({
              panInProgress: false,
              panStart: undefined,
            });
        }
    };
    handleTouchMove = (e) => {
        const { onMouseMove } = this.props;
        if (onMouseMove === undefined) {
            return;
        }
        const touch = getTouchProps(e.touches[0]);
        const touchXY = touchPosition(touch, e);
        onMouseMove(touchXY, "touch", e);
    };
    handleTouchStart = (e) => {
        this.mouseInteraction = false;
        const { pan: panEnabled, chartConfig, onMouseMove, xScale, onPanEnd } = this.props;
        if (e.touches.length === 1) {
            this.panHappened = false;
            const touchXY = touchPosition(getTouchProps(e.touches[0]), e);
            if (onMouseMove !== undefined) {
                onMouseMove(touchXY, "touch", e);
            }
            if (panEnabled) {
                const currentCharts = getCurrentCharts(chartConfig, touchXY);
                this.setState({
                    panInProgress: true,
                    panStart: {
                        panStartXScale: xScale,
                        panOrigin: touchXY,
                        chartsToPan: currentCharts,
                    },
                });
                select(d3Window(this.ref.current))
                  .on(TOUCHMOVE, this.handlePan, false)
                  .on(TOUCHEND, this.handlePanEnd, false);
            }
        }
        else if (e.touches.length === 2) {
            // pinch zoom begin
            // do nothing pinch zoom is handled in handleTouchMove
            const { panInProgress, panStart } = this.state;
            if (panInProgress && panEnabled && onPanEnd && panStart !== undefined) {
                const {
                  panStartXScale,
                  panOrigin: [dx, dy],
                  chartsToPan
                } = panStart;

                select(d3Window(this.ref.current))
                  .on(MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null)
                  .on(MOUSEUP, null)
                  .on(TOUCHMOVE, this.handlePinchZoom, false)
                  .on(TOUCHEND, this.handlePinchZoomEnd, false);

                const touch1Pos = touchPosition(getTouchProps(e.touches[0]), e);
                const touch2Pos = touchPosition(getTouchProps(e.touches[1]), e);
                if (this.panHappened && panEnabled && onPanEnd && this.lastNewPos !== undefined) {
                  onPanEnd(this.lastNewPos, panStartXScale, { dx, dy }, chartsToPan, e);
                }
                this.setState({
                  panInProgress: false,
                  pinchZoomStart: {
                    xScale,
                    touch1Pos,
                    touch2Pos,
                    range: xScale.range(),
                    chartsToPan
                  }
                });
            }
        }
    };

    handlePinchZoom = (e) => {
        const { pinchZoomStart } = this.state;
        if (pinchZoomStart === undefined) {
            return;
        }
        const { xScale, zoom: zoomEnabled, onPinchZoom } = this.props;
        if (!zoomEnabled || onPinchZoom === undefined) {
            return;
        }
        const [touch1Pos, touch2Pos] = pointers(this.ref.current);
        /*eslint-disable no-unused-vars*/
        const { chartsToPan, ...initialPinch } = pinchZoomStart;
        /*eslint-enable no-unused-vars*/
        onPinchZoom(initialPinch, {
            touch1Pos,
            touch2Pos,
            xScale,
        }, e);
    };
    handlePinchZoomEnd = (e) => {
      select(d3Window(this.ref.current))
        .on(TOUCHMOVE, null)
        .on(TOUCHEND, null);
      const { pinchZoomStart } = this.state;
      if (pinchZoomStart === undefined) {
        return;
      }
      /*eslint-disable no-unused-vars*/
      const {
        chartsToPan,
        ...initialPinch
      } = pinchZoomStart
      /*eslint-enable no-unused-vars*/
      , {
        zoom: zoomEnabled,
        onPinchZoomEnd
      } = this.props;
      if (zoomEnabled && onPinchZoomEnd) {
        onPinchZoomEnd(initialPinch, e);
      }
      this.setState({
        pinchZoomStart: undefined
      });
    };

    setCursorClass = (cursorOverrideClass) => {
        if (cursorOverrideClass !== this.state.cursorOverrideClass) {
            this.setState({
                cursorOverrideClass,
            });
        }
    };
    render() {
        const {
          height,
          width,
          disableInteraction,
          useCrossHairStyleCursor
        } = this.props
        , {
          cursorOverrideClass,
          panInProgress
        } = this.state
        , className = disableInteraction
            ? void 0
            : cursorOverrideClass !== undefined
                ? cursorOverrideClass
                : !useCrossHairStyleCursor
                    ? void 0
                    : panInProgress
                        ? CL_GRABBING_CURSOR
                        : CL_CROSSHAIR_CURSOR
        , interactionProps = disableInteraction || {
            onMouseDown: this.handleMouseDown,
            onClick: this.handleClick,
            onContextMenu: this.handleRightClick,
            onTouchStart: this.handleTouchStart,
            onTouchMove: this.handleTouchMove
        };

        return (
          <rect
            ref={this.ref}
            className={className}
            width={width}
            height={height}
            style={{ opacity: 0 }}
            {...interactionProps}
          />
       );
    }
}
