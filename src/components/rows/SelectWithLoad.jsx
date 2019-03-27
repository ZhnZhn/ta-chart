import React, { useState, useEffect } from 'react'

import RowInputSelect from './RowInputSelect'
import loadOptions from './loadOptions'

const SelectWithLoad = (props) => {
  const { optionURI } = props
  , [options, setOptions] = useState([])
  , [isLoading, setIsLoading] = useState(false)
  , [isLoadingFailed, setIsLoadingFailed] = useState(false);

  const _onLoadOptions = () => loadOptions({
    uri: optionURI,
    setOptions, setIsLoading, setIsLoadingFailed
  })

  useEffect(_onLoadOptions, [optionURI])

  return (
    <RowInputSelect
       {...props}
       options={options}
       isLoading={isLoading}
       isLoadingFailed={isLoadingFailed}
       onLoadOption={_onLoadOptions}
    />
  );
}

export default SelectWithLoad
