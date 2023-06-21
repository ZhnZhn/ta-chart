import { merge } from "../utils";
import { bollingerband as bollingerBandImpl } from "../calculator";
import baseIndicator from "./baseIndicator";
import crIndicator from './crIndicator';

const ALGORITHM_TYPE = "BollingerBand";

/*
interface BollingerBandIndicator {
    (data: any[], options?: { merge: boolean }): any;
    id(): number;
    id(x: number): BollingerBandIndicator;
    accessor(): any;
    accessor(x: any): BollingerBandIndicator;
    stroke(): string | any;
    stroke(x: string | any): BollingerBandIndicator;
    fill(): string | any;
    fill(x: string | any): BollingerBandIndicator;
    echo(): any;
    echo(x: any): BollingerBandIndicator;
    type(): string;
    type(x: string): BollingerBandIndicator;
    merge(): any;
    merge(newMerge: any): BollingerBandIndicator;
    options(): BollingerBandOptions;
    options(newOptions: BollingerBandOptions): BollingerBandIndicator;
}
*/

export const bollingerBand = () => {
  const base = baseIndicator()
     .type(ALGORITHM_TYPE)
  , underlyingAlgorithm = bollingerBandImpl()
  , mergedAlgorithm = merge()
     .algorithm(underlyingAlgorithm)
     .merge((datum, i) => { datum.bollingerBand = i; })

  return crIndicator(
    ALGORITHM_TYPE,
    base,
    underlyingAlgorithm,
    mergedAlgorithm
  );
}
