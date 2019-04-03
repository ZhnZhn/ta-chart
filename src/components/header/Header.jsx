import React, { useContext } from 'react'

import AppValue from '../contexts/AppValue'
import AppThemeId from '../contexts/AppThemeId'

import Logo from '../zhn/Logo'

import CL from '../styles/CL'
import ProgressLoading from './ProgressLoading'
import HeaderDrawer from '../drawer/HeaderDrawer'

const TitleSpan = ({ text, is }) => (
  <span className={CL.HEADER_TITLE}>
    {text}
    { !is && <span>:&nbsp;</span> }
  </span>
);

const Header = ({
  fetchStatus,
  providerTitle='',
  itemTitle='',
  timeframe='',
  ...rest
}) => {
  const { theme } = useContext(AppValue)
  , themeId = useContext(AppThemeId)
  , headerStyle = theme.getHeaderStyle(themeId);
  return (
    <header
      className={CL.HEADER}
      style={headerStyle}
    >
      <ProgressLoading fetchStatus={fetchStatus} />
      <Logo />
      <span className={CL.TITLE_GAP} />
      <TitleSpan text={providerTitle} />
      <TitleSpan text={itemTitle} />
      <TitleSpan text={timeframe} is={true} />
      <HeaderDrawer {...rest} />
    </header>
  );
}

export default Header
