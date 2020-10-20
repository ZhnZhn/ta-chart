import { render } from 'react-dom'

import App from './components/App'



//console.log(ccxt.exchanges)

/*
ccxt.exchanges.forEach(id => {
  try {
    const _exch = new ccxt[id]()
    if (_exch.hasCORS) {
      console.log(id)
      console.log(_exch)
    }
  } catch(err) {
    console.log('error', id)
    console.log(err.message)
  }
})
*/

render(
  <App />,
  document.getElementById('app')
)
