import { cloneElement } from '../uiApi';

const PageStack = ({
  style,
  pages,
  pageCurrent,
  onPrevPage,
  onNextPage
}) => pages
  .map((Page, index) => cloneElement(Page, {
     style,
     pageCurrent,
     pageNumber: index + 1,
     onPrevPage,
     onNextPage
  }))

export default PageStack
