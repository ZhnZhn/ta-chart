import {
  useRef,
  useState,
  createElement,
  getRefValue,
  setRefValue
} from '../uiApi';

import useThrottleCallback from '../hooks/useThrottleCallback';

import PageStack from './PageStack';

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
  arr[0],
  arr.splice(index, 1)[0],
  ...arr.slice(1)
];
const _addElTo2 = (arr, el) => [
  arr[0],
  el,
  ...arr.slice(1)
];

const _crTransform = (
  pageWidth,
  _refPages,
  _refDirection
) => {
  const pagesEl = getRefValue(_refPages)
  , _direction = getRefValue(_refDirection);
  let dX = 0;
  if (_direction !== 0 && pagesEl) {
    const prevInt = _getTranslateX(pagesEl);
    dX = _direction === 1
       ? prevInt - pageWidth
       : prevInt + pageWidth
    setRefValue(_refDirection, 0)
  } else if (_direction === 0 && pagesEl) {
    dX = _getTranslateX(pagesEl)
  }
  return {
    transform: `translateX(${dX}px)`
  };
}

const CompSlider = ({
  pageWidth=330,
  maxPages=3,
  initialPageId,
  pageRouter
}) => {
  const _refPages = useRef()
  , _refDirection = useRef(0)
  , _refPagesStyle = useRef({
    width: `${maxPages*pageWidth}px`
  })
  , _refPageStyle = useRef({
    width: `${pageWidth}px`
  })
  , [
    state,
    setState
  ] = useState({
    pageCurrent: 1,
    pages: [
      createElement(pageRouter[initialPageId], {
        key: initialPageId
      })
    ]
  })
  , {
    pageCurrent,
    pages
  } = state
  , hPrevPage = useThrottleCallback(() => {
     setState(prevState => {
       if (prevState.pageCurrent > 1) {
         prevState.pageCurrent -= 1
         setRefValue(_refDirection, -1)
       }
       return {...prevState};
     })
  })
  , hNextPage = useThrottleCallback((id) => {
     setState(prevState => {
       const { pages } = prevState;
       const _pageIndex = _findIndexById(pages, id);
       prevState.pages = _pageIndex !== -1
          ? _replaceElTo2(pages, _pageIndex)
          : _addElTo2(pages, createElement(pageRouter[id], {key: id}))
       prevState.pageCurrent += 1
       setRefValue(_refDirection, 1)
       return {...prevState};
     })
  })
  , _transform = _crTransform(
      pageWidth,
      _refPages,
      _refDirection
  )
  , _divStyle = {
      ...getRefValue(_refPagesStyle),
      ...S_PAGES,
      ..._transform
  };

  return (
    <div style={S_SHOW_HIDE}>
      <div
        ref={_refPages}
        style={_divStyle}
      >
        <PageStack
          style={getRefValue(_refPageStyle)}
          pages={pages}
          pageCurrent={pageCurrent}
          onPrevPage={hPrevPage}
          onNextPage={hNextPage}
        />
      </div>
    </div>
  );
};

export default CompSlider
