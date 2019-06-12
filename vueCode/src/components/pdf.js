import baseURL from '$lib/utils/baseURL';
import Cookies from 'js-cookie';
import ajax from '@utils/config';
/**
 * params {obj} object
 * {
 *  url,
 *  method,
 *  enctype,
 *  input: {
 *      key: value,
 *      ...
 *  }
 * }
 */
export function downloadPDF (params) {
    let url = baseURL()+params.url;
    let method = params.method || 'get';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口
    xhr.responseType = "blob";  // 返回类型blob
    xhr.setRequestHeader('Authorization', Cookies.get('token'));
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onload = function () {
      // 请求完成
      if (this.status === 200) {
        // 返回200
        var blob = this.response;
        var reader = new FileReader();
        reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
        reader.onload = function (e) {
          // 转换完成，创建一个a标签用于下载
          var a = document.createElement('a');
          a.download = 'data.pdf';
          a.href = e.target.result;
          document.body.append(a);  // 修复firefox中无法触发click
          a.click();
          document.body.removeChild(a);
        }
      }
    };
    // 发送ajax请求
    xhr.send()
}
