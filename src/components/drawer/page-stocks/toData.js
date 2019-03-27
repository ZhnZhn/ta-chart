import ymdToUTC from '../../../utils/ymdToUTC'

const toData = json => json
 .map(p => {
   p.date = ymdToUTC(p.date)
   return p;
});

export default toData
