
const loadOptions = ({
  uri,
  setOptions, setIsLoading, setIsLoadingFailed
}) => {
  setIsLoading(true)
  fetch(uri)
    .then(response => {
       const { status } = response;
       if (status>=200 && status<400){
          return response.json();
       } else {
          throw new Error(`Loading Error: ${status}`);
       }
    })
    .then(json => {
      if (json && json.items) {
        setIsLoading(false)
        setIsLoadingFailed(false)
        setOptions(json.items)
      }
    })
    .catch(err => {
       setIsLoading(false)
       setIsLoadingFailed(true)
       console.log(err)
    })
}

export default loadOptions
