import RowInputSelect from '../../rows/RowInputSelect'

const CoinSelect = ({
  style,
  exchanges,
  onSelectExchange,
  isMarkets={},
  markets,
  onSelectMarket,
  timeframes,
  onSelectTimeframe
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
      placeholder="Time Frames (Default: 1d)"
      options={timeframes}
      onSelect={onSelectTimeframe}
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
