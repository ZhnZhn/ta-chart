const fetchImpl = url => fetch(url)
 .then(res => {
   const { status } = res;
   if (status >= 200 && status < 400) {
     return res.json();
   }
   throw new Error('Response is incorrect: ' + status)
 });

 export default fetchImpl
