import { merge } from "../utils";
import { rsi as rsiImpl } from "../calculator";
import baseIndicator from "./baseIndicator";
import crIndicator from './crIndicator';

const ALGORITHM_TYPE = "RSI";

/*
interface RSIIndicator {
    (data: any[], options?: { merge: boolean }): any;
    id(): number;
    id(x: number): RSIIndicator;
    accessor(): any;
    accessor(x: any): RSIIndicator;
    stroke(): string | any;
    stroke(x: string | any): RSIIndicator;
    fill(): string | any;
    fill(x: string | any): RSIIndicator;
    echo(): any;
    echo(x: any): RSIIndicator;
    type(): string;
    type(x: string): RSIIndicator;
    merge(): any;
    merge(newMerge: any): RSIIndicator;
    options(): RSIOptions;
    options(newOptions: RSIOptions): RSIIndicator;
}
*/

export const rsi = () => {
  const base = baseIndicator()
     .type(ALGORITHM_TYPE)
     .accessor(d => d.rsi)
  , underlyingAlgorithm = rsiImpl()
  , mergedAlgorithm = merge()
     .algorithm(underlyingAlgorithm)
     .merge((datum, i) => { datum.rsi = i; });

  return crIndicator(
    ALGORITHM_TYPE,
    base,
    underlyingAlgorithm,
    mergedAlgorithm
  );
}
