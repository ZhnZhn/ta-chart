import React, { useContext } from 'react'

import AppValue from '../contexts/AppValue'
import AppThemeId from '../contexts/AppThemeId'

import DrawerTitle from './DrawerTitle'

import CompSlider from '../zhn-slider/CompSlider'
import pageRouter from './pageRouter'

const CL = {
  ROOT: 'drawer__list'
};

const DrawerMenu = ({ onCloseDrawer }) => {
  const { theme, setThemeId } = useContext(AppValue)
  , themeId = useContext(AppThemeId)
  , drawerStyle = theme.getDrawerStyle(themeId);
  return (
    <div
      className={CL.ROOT}
      style={drawerStyle}
    >
      <DrawerTitle
        setThemeId={setThemeId}
        onClose={onCloseDrawer}
      />
      <CompSlider
        pageRouter={pageRouter}
        initialPageId="p1"
        maxPages={4}
      />
    </div>
  );
}

export default DrawerMenu
