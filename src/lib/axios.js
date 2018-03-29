import axios from "axios";
import {
  Message
} from "element-ui";
import router from "../router";

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

const Axios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  responseType: "json",
  cancelToken: source.token,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});


Axios.interceptors.request.use(
  config => {
    // 若是有做鉴权token , 就给头部带上token
    if (config.url.match('login')) {
      return config;
    } else {
      if (sessionStorage.getItem('token')) {
        config.headers.common['x-token'] = sessionStorage.getItem('token');
      } else {
        Message({
          //  饿了么的消息弹窗组件
          showClose: true,
          message: "未登录,请先登录！",
          type: "error"
        });
        source.cancel('未登录');
      }
      return config;
    }
  },
  error => {
    Message({
      //  饿了么的消息弹窗组件
      showClose: true,
      message: error,
      type: "error"
    });
    return Promise.reject(error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // console.log(res);
    switch( res.status ){
      case 201:
        Message({
          showClose: true,
          message: '新建成功',
          type: "success"
        });
        break;
      case 204:
        Message({
          showClose: true,
          message: '删除成功',
          type: "success"
        });
        break;
      default:
        if (res.data.code != 0) {
          Message({
            //  饿了么的消息弹窗组件,类似toast
            showClose: true,
            message: res.data.message,
            type: "error"
          });
          return Promise.reject(res.data.message);
        }
    } 

    return res;
  },
  error => {
    // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    // if (error.response.status === 403) {
    //   console.log(403);
    //   router.push({
    //     path: "/error/403"
    //   });
    // }
    // if (error.response.status === 500) {
    //   console.log(500);
    //   // router.push({
    //   //   path: "/error/500"
    //   // });
    // }
    // if (error.response.status === 502) {
    //   router.push({
    //     path: "/error/502"
    //   });
    // }
    if (error.message === '未登录') {
      router.push({
        path: "/signin"
      });
      console.log('未登录');
    }
    // 返回错误信息
    let errorInfo = error.message;
    return Promise.reject(errorInfo);
  }
);

const httpServer = {

  post: function (url, params) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {
          params: params
        })
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  put: function (url, params) {
    return new Promise((resolve, reject) => {
      Axios.put(url, params)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  patch: function (url, params) {
    return new Promise((resolve, reject) => {
      Axios.patch(url, params)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  del: function (url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, params)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
}


// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default httpServer;
