import React, { useContext } from 'react'

import AppValue from '../contexts/AppValue'
import AppThemeId from '../contexts/AppThemeId'

import Logo from '../zhn/Logo'

import CL from '../styles/CL'
import ProgressLoading from './ProgressLoading'
import HeaderDrawer from '../drawer/HeaderDrawer'

const Header = ({
  fetchStatus,
  providerTitle, itemTitle,
  ...rest
}) => {
  const { theme } = useContext(AppValue);
  const themeId = useContext(AppThemeId);
  const headerStyle = theme.getHeaderStyle(themeId);
  return (
    <header
      className={CL.HEADER}
      style={headerStyle}
    >
      <ProgressLoading fetchStatus={fetchStatus} /> 
      <Logo />
      <span className={CL.TITLE_GAP} />
      <span className={CL.HEADER_TITLE}>
        {providerTitle}
      </span>
      <span className={CL.HEADER_TITLE}>:&nbsp;</span>
      <span className={CL.HEADER_TITLE}>
        {itemTitle}
      </span>
      <HeaderDrawer {...rest} />
    </header>
  );
}

Header.defaultProps = {
  providerTitle: '',
  itemTitle: ''
}

export default Header
