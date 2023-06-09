/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/bollingerBands.js
The MIT License (MIT)
Copyright (c) 2014-2015 Scott Logic Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { deviation, mean } from '../d3Array';
import { path, slidingWindow, zipper } from '../utils';
import ema from './ema';
import { BOLLINGER_BAND as defaultOptions } from './defaultOptionsForComputation';

/*
export interface BollingerBandOptions {
    readonly windowSize: number;
    readonly sourcePath: string;
    readonly multiplier: number;
    readonly movingAverageType: string;
}

interface BollingerBandCalculator {
    (data: any[]): any;
    undefinedLength(): number;
    options(): BollingerBandOptions;
    options(newOptions: BollingerBandOptions): BollingerBandCalculator;
}
*/

export default function () {
    let options = defaultOptions;

    const calculator = (data) => {
        const {
          windowSize,
          multiplier,
          movingAverageType,
          sourcePath
        } = options
        , source = path(sourcePath)

        , meanAlgorithm = movingAverageType === "ema"
            ? ema().options({ windowSize, sourcePath })
            : slidingWindow()
                .windowSize(windowSize)
                .accumulator((values) => mean(values))
                .sourcePath(sourcePath)

        , bollingerBandAlgorithm = slidingWindow()
            .windowSize(windowSize)
            .accumulator(values => {
                const avg = values[values.length - 1].mean
                , stdDev = deviation(values, each => source(each.datum));

                return stdDev === undefined
                  ? void 0
                  : {
                      top: avg + multiplier * stdDev,
                      middle: avg,
                      bottom: avg - multiplier * stdDev,
                    };
            })

        , zip = zipper()
            .combine((datum, mean) => ({
               datum,
               mean
            }))

        , tuples = zip(data, meanAlgorithm(data));

        return bollingerBandAlgorithm(tuples);
    };

    calculator.undefinedLength = () => options.windowSize - 1

    calculator.options = (...args) => args.length
      ? (options = {...defaultOptions, ...args[0]}, calculator)
      : options

    return calculator;
}
