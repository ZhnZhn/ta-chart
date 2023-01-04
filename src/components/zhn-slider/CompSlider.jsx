import {
  Component,
  createRef,
  createElement,
  cloneElement
} from '../uiApi';

import throttleFn from '../../utils/throttleFn';

const PERIOD_MS = 750;

const S_SHOW_HIDE = {
  position: 'absolute',
  overflow: 'hidden'
}
, S_PAGES = {
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  transition: `all ${PERIOD_MS}ms ease-out`
};


const _getTranslateX = node => parseInt(node
 .style.transform
    .substr(11)
    .replace('px', '')
    .replace(')', ''),
 10);

const _findIndexById = (arr, id) => arr
  .findIndex(el => el.key === id);
const _replaceElTo2 = (arr, index) => [
  arr[0], arr.splice(index, 1)[0], ...arr.slice(1)
];
const _addElTo2 = (arr, el) => [
  arr[0], el, ...arr.slice(1)
];

class ModalSlider extends Component {
  /*
  static propTypes = {
    rootStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,

    pageWidth: PropTypes.number,
    maxPages: PropTypes.number,

    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    pageWidth: 330,
    maxPages: 3
  }

  constructor(props){
    super(props)
    const {
      pageWidth, maxPages,
      initialPageId
    } = props;

    this._refPages = createRef()

    this.hNextPage = throttleFn(
      this.hNextPage.bind(this)
    )
    this.hPrevPage = throttleFn(
      this.hPrevPage.bind(this)
    )

    this._PAGE_WIDTH = pageWidth
    this._pagesStyle = {
      width: `${maxPages*pageWidth}px`
    }
    this._pageStyle = {
      width: `${pageWidth}px`,
    }
    this._direction = 0

    this.state = {
      pageCurrent: 1,
      pages: [ this._crPageElement(initialPageId) ]
    }
  }

  _crPageElement = id => createElement(this.props.pageRouter[id], {
     key: id,
     style: this._pageStyle,
     onPrevPage: this.hPrevPage,
     onNextPage: this.hNextPage
  })

  hPrevPage = () => {
    this.setState(prevState => {
      if (prevState.pageCurrent > 1) {
        prevState.pageCurrent -= 1
        this._direction = -1
      }
      return prevState;
    })
  }

  hNextPage = (id) => {
    this.setState(prevState => {
      const { pages } = prevState;
      const _pageIndex = _findIndexById(pages, id);
      prevState.pages = _pageIndex !== -1
         ? _replaceElTo2(pages, _pageIndex)
         : _addElTo2(pages, this._crPageElement(id))
      prevState.pageCurrent += 1
      this._direction = 1
      return prevState;
    })
  }

  _crTransform = () => {
    const pagesEl = this._refPages.current;
    const WIDTH = this._PAGE_WIDTH;
    let dX = 0;
    if (this._direction !== 0 && pagesEl) {
      const prevInt = _getTranslateX(pagesEl);
      dX = this._direction === 1
         ? prevInt - WIDTH
         : prevInt + WIDTH
      this._direction = 0
    } else if ( this._direction === 0 && pagesEl) {
      dX = _getTranslateX(pagesEl)
    }
    return {
      transform: `translateX(${dX}px)`
    };
  }

  _renderPages = () => {
    const { pages, pageCurrent } = this.state;
    return pages.map((Page, index) => cloneElement(Page, {
      pageCurrent,
      pageNumber: index + 1,
    }))
  }

  render(){
    const { _pagesStyle } = this
    , _transform = this._crTransform()
    , _divStyle = {
        ...S_PAGES,
        ..._pagesStyle,
        ..._transform
      };
    return (
      <div style={S_SHOW_HIDE}>
        <div
          ref={this._refPages}
          style={_divStyle}
        >
          {this._renderPages()}
        </div>
      </div>
    );
  }
}

export default ModalSlider
