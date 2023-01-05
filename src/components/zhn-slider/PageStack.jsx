import { cloneElement } from '../uiApi';

const PageStack = ({
  pages,
  pageCurrent
}) => pages
  .map((Page, index) => cloneElement(Page, {
     pageCurrent,
     pageNumber: index + 1,
  }))

export default PageStack
