import { Component } from '../../uiApi';

const mathRound = Math.round
, mathMax = Math.max;

const _getRatio = (canvasEl) => {
  if (canvasEl != null) {
    const context = canvasEl.getContext("2d")
    , devicePixelRatio = window.devicePixelRatio || 1
    , backingStoreRatio = context.webkitBackingStorePixelRatio
       || context.mozBackingStorePixelRatio
       || context.msBackingStorePixelRatio
       || context.oBackingStorePixelRatio
       || context.backingStorePixelRatio
       || 1
    , ratio = devicePixelRatio / backingStoreRatio;
    return ratio;
  }
  return 1;
};

const _getParentNode = (
  el
) => (el || {}).parentNode || window;

const _calcWidth = (el, minWidth) => {
  const {
    width,
    paddingLeft,
    paddingRight
  } = window.getComputedStyle(_getParentNode(el))
  , w = parseFloat(width) - (parseFloat(paddingLeft) + parseFloat(paddingRight));

  return mathRound(mathMax(w, minWidth));
};


const _getDisplayName = (
  Series
) => Series.displayName || Series.name || "Series";

export default function fitWidth(
  WrappedComponent,
  withRef = true,
  minWidth = 100
) {
	class ResponsiveComponent extends Component {
    state = {}

		saveNode = (node) => {
			this.node = node;
		}
		setTestCanvas = (node) => {
			this.testCanvas = node;
		}

		componentDidMount() {
			window.addEventListener("resize", this._hWindowResize);
			this._hWindowResize();			
			this.setState({
        ratio: _getRatio(this.testCanvas)
			});
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this._hWindowResize);
		}

		_hWindowResize = () => {
      this.setState({
        width: _calcWidth(_getParentNode(this.testCanvas), minWidth)
      });
      /*
			this.setState({
				width: 0
			}, () => {
				this.setState({
          width: _calcWidth(_getParentNode(this.testCanvas), minWidth)
				});
			});
      */
		}

		getWrappedInstance = () => {
			return this.node;
		}
		render() {
			const {
        width,
        ratio
      } = this.state
      , ref = withRef
         ? { ref: this.saveNode }
         : {};

      return width
        ? (
            <WrappedComponent
              width={width}
              ratio={ratio}
              {...this.props}
              {...ref}
            />
          )
        : (
            <div {...ref}>
					    <canvas ref={this.setTestCanvas}  />
				    </div>
          );
		}
	}

	ResponsiveComponent.displayName = `fitWidth(${_getDisplayName(WrappedComponent)})`;

	return ResponsiveComponent;
}
