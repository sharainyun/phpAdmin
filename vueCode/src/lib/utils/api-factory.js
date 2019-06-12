/* eslint-disable no-invalid-this */
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import _ from 'underscore';
import Cookies from 'js-cookie';
import Deferred from './deferred';
import loginout from '@src/utils/loginout';
import { Message } from 'element-ui';
import baseURL from './baseURL';
const ajax = axios.create({
  baseURL: baseURL(),
  timeout: 5000,
});

ajax.defaults.withCredentials = true;

export class Descriptor {
  constructor(desc) {
    this._url = _.isFunction(desc.url) ? desc.url : function () { return desc.url; };
    this._paramsValidator = _.chain(desc.params)
      .omit(v => !_.isFunction(v.validate))
      .mapObject(v => v.validate)
      .value();
    this._defaultParams = _.mapObject(desc.params, v => v.defaultValue);
    this._headers = desc.headers || {};
    this._optionParams = desc.optionParams;
    this._responseType = desc.responseType || 'json';
    this._contentType = `${desc.contentType || 'application/json'}; charset=UTF-8`;
    this._authorization = Cookies.get('token')?Cookies.get('token') : 'Basic eWdnOnlnZw==';
  }

  makeParams(paramsFns) {
    return _.chain(paramsFns)
      .reduce((acc, v) => {
        const p = _.isFunction(v) ? v.call(acc) : v;
        return _.extend({}, acc, _.omit(p, value => _.isUndefined(value)));
      }, this._defaultParams)
      .mapObject((v, k, a) => _.isFunction(v) ? v.call(a) : v, this)
      .value();
  }

  makeRequest(method, params) {
    const data = _.omit.apply(_, [params].concat(this._optionParams))
      , headers = _.extend({
        'Content-Type': this._contentType,
        'Authorization': Cookies.get('token')?Cookies.get('token') : 'Basic eWdnOnlnZw==',
      }, this._headers);
    return {
      data: data.optionParams,
      method,
      headers,
      cancelToken: null,
      url: this._url(params),
      responseType: this._responseType,
    };
  }
}
// // respone拦截器
// ajax.interceptors.response.use(
//   response => response,
//   /**
//   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//   */
//   error => {

//     console.log('err' + error)// for debug  res.message,

//     Message({
//       // message: "接口请求时间超时5s",
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     // loginout();
//     //location.reload();
//     //setInterval(loginout(), 8000);
//     deferred.reject(err, params);

//     return deferred.promise;
//     // return Promise.reject(error)
//   })
export default (descriptor) => {
  const desc = new Descriptor(descriptor);

  return function () {
    const paramsFns = [].slice.call(arguments, 0)
      , exec = function (method, preFilter) {
        const params = desc.makeParams(paramsFns);
        let ajaxOption = desc.makeRequest(method, params);
        if (this._token) {
          this._token.cancel('Cancel ajax request.');
          this._token = null;
        }
        this._token = axios.CancelToken.source();

        if (preFilter) {
          ajaxOption = preFilter(ajaxOption);
        }
        ajaxOption.cancelToken = this._token.token;

        const deferred = Deferred();
        ajax(ajaxOption)
          .then(v => {
            this._token = null;
            
            // if (v.data.code === 200) {
            // } else if (v.data.code === 403) {
            //   // loginout登录会话超时
            //   // loginout();
            //   return false;
            // } else {
            //   // if (v.data.msg) {
            //   //   Message({
            //   //     message: v.data.msg,
            //   //     type: 'warning',
            //   //     customClass: 'MessageCustomClass',
            //   //     // duration: 10000000000000000
            //   //   });
            //     Message.warning(v.data.msg)
            //     // return false;
            //   // }
            // }

            deferred.resolve(v.data, params);
          })
          .then(null, err => {
            console.log(err);
            if (!axios.isCancel(err)) {
              this._token = null;

              deferred.reject(err, params);
            }
          });

        return deferred.promise;
      };

    return {
      fetch(preFilter) {
        return exec.call(this, 'GET', preFilter);
      },
      post(preFilter) {
        return exec.call(this, 'POST', preFilter);
      },
      put(preFilter) {
        return exec.call(this, 'PUT', preFilter);
      },
      del(preFilter) {
        return exec.call(this, 'DELETE', preFilter);
      },
    };
  };
};
