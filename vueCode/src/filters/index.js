import  * as constants  from '../constants/index.js';

export  function  parseStringToInt(val){ 
  return parseInt(val); 
}  


 export function parseTime(time, cFormat) {
    
     
   if (arguments.length === 0) {
     return null;
   }
     if(time === undefined ||time === null)
       return '';
     
   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
   let date;
   if (typeof time == 'object') {
     date = time;
   } else {
     if (('' + time).length === 10) time = parseInt(time) * 1000;
    
     date = new Date(time);
   }
   const formatObj = {
     y: date.getFullYear(),
     m: date.getMonth() + 1,
     d: date.getDate(),
     h: date.getHours(),
     i: date.getMinutes(),
     s: date.getSeconds(),
     a: date.getDay()
   };
   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
     let value = formatObj[key];
     if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
     if (result.length > 0 && value < 10) {
       value = '0' + value;
     }
     return value || 0;
   });
   return time_str;
 }


function getText(arr, code){
    let text ;
    arr.forEach(v => {
        if(v.code == code){
            text = v.text;
            return 
        }
    });
    return text;
}

function getTag(arr, code){
    let tag;
    arr.forEach(v =>{
        if(v.code == code){
            tag = v.tag;
            return 
        }
    });
    return tag;
   
}

export function loanFilter(code){
    return  getText(constants.loantatusMap, code);
}


export function userStatusFilter(code){
    return  getText(constants.userStatusMap, code);
}

//金钱格式化
export function formatMoney(value) {
    if (value) {
        return (value / 100).toFixed(2);
    } else {
        return '0.00';
    }
}


