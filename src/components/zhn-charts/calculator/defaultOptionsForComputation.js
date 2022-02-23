export const BOLLINGER_BAND = {
   // source: d => d.close, // "high", "low", "open", "close"
   sourcePath: "close",
   multiplier: 2,
   movingAverageType: "sma",
   windowSize: 20
};

export const EMA = {
   // source: d => d.close, // "high", "low", "open", "close"
   sourcePath: "close",
   windowSize: 10,
};

export const RSI = {
   // source: d => d.close, // "high", "low", "open", "close"
   sourcePath: "close", // "high", "low", "open", "close"
	 windowSize: 14,
};

export const SMA = {
	 // source: d => d.close, // "high", "low", "open", "close"
	 sourcePath: "close",
	 windowSize: 10,
};
