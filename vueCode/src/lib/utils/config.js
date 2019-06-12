import ajax from '$lib/utils/api-factory';
import baseURL from './baseURL';
export default new ajax({
  // url: v => `https://www.jcs188.com/hjjr/`,
  // url: v => `http://192.168.0.15:9999/`,
  url: v => baseURL()+`${v.url}`,
  optionParams: ['url'],
});
