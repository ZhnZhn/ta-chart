import { useContext } from '../uiApi'

import AppValue from '../contexts/AppValue'
import AppThemeId from '../contexts/AppThemeId'

import Logo from '../zhn/Logo'

import CL from '../styles/CL'
import ProgressLoading from './ProgressLoading'
import HeaderDrawer from '../drawer/HeaderDrawer'
import LiveUpdatingBt from './LiveUpdatingBt'

const _toFirstCapital = text => text
 .charAt(0).toUpperCase() + text.substr(1);

const TitleSpan = ({ text, is }) => (
  <span className={CL.HEADER_TITLE}>
    {_toFirstCapital(text)}
    { !is && <span>:&nbsp;</span> }
  </span>
);

const Header = ({
  fetchStatus,
  providerTitle='',
  itemTitle='',
  timeframe='',
  isLiveUpdating,
  ...rest
}) => {
  const { theme, onStopUpdate } = useContext(AppValue)
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
      <LiveUpdatingBt
        spinnerCn={CL.SPINNER}
        onStopUpdate={onStopUpdate}
      />
      <HeaderDrawer {...rest} />
    </header>
  );
}

export default Header
