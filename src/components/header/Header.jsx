import { useContext } from '../uiApi';
import toFirstUpperCase from '../../utils/toFirstUpperCase';

import AppValue from '../contexts/AppValue';
import AppThemeId from '../contexts/AppThemeId';

import Logo from '../zhn/Logo';

import ProgressLoading from './ProgressLoading';
import HeaderDrawer from '../drawer/HeaderDrawer';
import LiveUpdatingBt from './LiveUpdatingBt';
import {
  CL_HEADER,
  CL_LOGO,
  CL_TITLE_GAP,
  CL_HEADER_TITLE,
  CL_SPINNER
} from './CL';

const TitleSpan = ({
  text,
  is
}) => (
  <span className={CL_HEADER_TITLE}>
    {toFirstUpperCase(text)}
    {!is && <span>:&nbsp;</span>}
  </span>
);

const Header = ({
  fetchStatus,
  providerTitle='',
  itemTitle='',
  timeframe='',
  isLiveUpdating,
  ...restProps
}) => {
  const {
    theme,
    onStopUpdate
  } = useContext(AppValue)
  , themeId = useContext(AppThemeId)
  , headerStyle = theme.getHeaderStyle(themeId);
  return (
    <header
      className={CL_HEADER}
      style={headerStyle}
    >
      <ProgressLoading fetchStatus={fetchStatus} />
      <Logo className={CL_LOGO} />
      <span className={CL_TITLE_GAP} />
      <TitleSpan text={providerTitle} />
      <TitleSpan text={itemTitle} />
      <TitleSpan text={timeframe} is={true} />
      <LiveUpdatingBt
        spinnerCn={CL_SPINNER}
        onStopUpdate={onStopUpdate}
      />
      <HeaderDrawer {...restProps} />
    </header>
  );
}

export default Header
