import React from 'react'

import RowInputSelect from '../../rows/RowInputSelect'

const CoinSelect = ({
  style,
  exchanges,
  onSelectExchange,
  isMarkets={},
  markets,
  onSelectMarket
}) => (
  <div style={style}>
    <RowInputSelect
      isShowLabels={false}
      placeholder="Exchanges"
      options={exchanges}
      onSelect={onSelectExchange}
    />
    <RowInputSelect
      isShowLabels={false}
      placeholder="Markets"
      isLoading={isMarkets.loading}
      isLoadingFailed={isMarkets.failed}
      options={markets}
      onSelect={onSelectMarket}
    />
  </div>
);

export default CoinSelect
