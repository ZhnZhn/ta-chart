
import C from './config'

let _proxy = C.PROXY;

const appSettings = {
  proxy: (proxy) => proxy
    ? (_proxy = proxy, true)
    : _proxy || '',
  restoreProxy: () => {
    return (_proxy = C.PROXY);
  }
}

export default appSettings
