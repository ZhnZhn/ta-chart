import {
  useEffect,
  cloneElement
} from 'react'

import useToggle from '../hooks/useToggle';


const CL_DRAWER_BT = 'drawer-bt'
, CL_DRAWER_SPAN = 'drawer-span'
, CL_DRAWER_SVG = 'drawer-svg'
, CL_DRAWER = 'drawer'
, CL_DRAWER_MODAL = 'drawer-modal'

, S_BT_DRAWER = {
  position: 'absolute',
  top: 0,
  right: 16
}
, S_DRAWER_OFF = {
  transform: 'translateX(334px)',
  pointerEvents: 'none'
}
, S_DRAWER_ON = { transform: 'translate(0px, 0px)'}
, S_MODAL_OFF = {
  display: 'none',
  opacity: 0,
  zIndex: -1,
  transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
}
, S_MODAL_ON = {
  display: 'block',
  opacity: 1,
  zIndex: 1000,
  transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
};



const Drawer = ({
  btStyle,
  children
}) => {
  const [isOpen, toggleIsOpen] = useToggle();

  useEffect(() => {
    document.body.style.overflowY = isOpen
      ? 'hidden'
      : 'auto'
  }, [isOpen])

  const _drawerStyle = isOpen
       ? S_DRAWER_ON
       : S_DRAWER_OFF
  , _drawerModalStyle = isOpen
       ? S_MODAL_ON
       : S_MODAL_OFF
  , _onClickWrapper = isOpen
       ? toggleIsOpen
       : void 0;

  return [
      <button
        key="bt-drawer"
        className={CL_DRAWER_BT}
        style={{...S_BT_DRAWER, ...btStyle}}
        aria-label="Open Drawer"
        onClick={toggleIsOpen}
      >
        <span className={CL_DRAWER_SPAN}>
          <svg
             className={CL_DRAWER_SVG}
             focusable="false"
             viewBox="0 0 24 24"
             aria-hidden="true"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </span>
      </button>,
      <div
        key="wrapper"
        role="presentation"
        aria-hidden={!isOpen}
        className={CL_DRAWER_MODAL}
        style={_drawerModalStyle}
        onClick={_onClickWrapper}
      />,
      <aside
        key="aside"
        className={CL_DRAWER}
        style={_drawerStyle}
       >
        {
          cloneElement(children, {
            onCloseDrawer: toggleIsOpen
          })
         }
      </aside>
    ];
};

export default Drawer
