
import PageMenu from './PageMenu'
import PageAltCoins from './page-altcoins/PageAltCoins'
import PageStocks from './page-stocks/PageStocks'
import PageSettings from './page-settings/PageSettings'

const pageRouter = {
  "p1": PageMenu,
  "p1-1": PageSettings,
  "p1-2": PageAltCoins,
  "p1-3": PageStocks,  
};

export default pageRouter
