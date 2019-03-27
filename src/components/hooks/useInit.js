
let obj;

const useInit = (fn) => obj
  ? obj
  : (obj = fn())  

export default useInit
