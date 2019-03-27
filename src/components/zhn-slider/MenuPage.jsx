import React from 'react'

const S = {
  PAGE: {
    border: '1px solid black'
  }
}

const MenuPage = ({ style, onNextPage, onPrevPage }) => (
  <div style={{...S.PAGE, ...style }}>
    <div onClick={() => onPrevPage(1)}>
      Prev Page
    </div>
    <div onClick={() => onNextPage("page_01", "page_01", 2)}>
      Next Page
    </div>
  </div>
);

export default MenuPage
