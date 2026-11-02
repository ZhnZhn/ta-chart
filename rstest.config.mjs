import { defineConfig } from '@rstest/core';

const _crIncludeDir = (
 token
) => `<rootDir>/src/${token}/__tests__/*.test.js`
, _crInclude = (...tokens) => tokens.map(_crIncludeDir);


export default defineConfig({
  globals: true,

  include: _crInclude(
    'components/zhn-charts/d3Array',
    'components/zhn-charts/d3Collection',
    'components/zhn-charts/d3Color', 
    'components/zhn-charts/d3Format',
    'components/zhn-charts/d3Interpolate', 
    'components/zhn-charts/d3Scale',
    'components/zhn-charts/d3Shape',
    'components/zhn-charts/d3Time',
    'utils'
  )  
});