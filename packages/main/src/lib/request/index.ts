import axios from "axios";
import type { AxiosInstance } from "axios";
import {
  AxiosRequest,
  AxiosRequestPaging,
  AxiosRequestMethod,
  RequestPagingData,
  ResponsePagingData
} from './index.d'
import { Cookies } from '../cookies'

const Axios = axios.create({
  baseURL: window.localStorage.getItem('apiBaseURL') || '', // process.env.NODE_ENV === 'development' ? '/' : '/api/v4.3/',
  timeout: 60000 // 请求超时时间
})
Axios.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    if (tokenType && token)
      config.headers!.Authorization = `${tokenType} ${token}`;
    return config;
  },
  error => {
    // 发送失败
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的
    const { code } = dataAxios;
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 200:
          // 成功返回数据
          return dataAxios;
        case 401:
          // 未登录，跳转到登录页
          break;
        case 500:

          break;
        default:
          // 不是正确的 code
          break;
      }
    }

  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          error.message = "未授权，请登录";
          // 判断是否有父级
          window.parent.location.href = "/web-main/pages/login.html"
          break;
        case 408:
          error.message = "请求超时,后台无响应";
          break;
        case 500:
          error.message = error.response.data.msg;
          try {
          } catch (error) {
            console.log(error)
          }
          break;
        default:
          break;
      }
    } else {
      // error.message = error.response.data.msg
      error.message = error;
    }

    if (window.parent && (window as any).parent.NaiveMessage) {
      (window as any).parent.NaiveMessage.error(error.message, {
        closable: true,
        duration: 7000
      })
    }
    return Promise.reject(error);
  }
);

// 通用请求
class Request<S, T> implements AxiosRequest<S, T> {
  url = ''
  method: AxiosRequestMethod = 'get'
  data: S = {} as S
  constructor(url: string, method: AxiosRequestMethod, data?: S) {
    this.method = method
    this.url = url
    if (data) this.data = data
  }
  send(p?: S) {
    if (p) this.data = p
    // if (p) Object.assign(this.data as {}, p);
    return Axios({
      url: this.url,
      method: this.method,
      [`${['post', 'put'].includes(this.method) ? 'data' : 'params'}`]: this.data
    }).then(d => {
      // console.log('=====d.data====', d)
      return d ? d.data : undefined
    })
  }
  cancel() {

  }
}
// new Request('', 'put')

class RequestPaging extends Request<RequestPagingData, ResponsePagingData> implements AxiosRequestPaging {
  constructor(url: string, method: AxiosRequestMethod, data?: RequestPagingData) {
    super(url, method, data)
  }
  send(p?: any) {
    return super.send(p).then(d => ({
      result: d.records,
      total: d.total
    }))
  }
}

const request = (d: object, isNormal: boolean = true) => {
  if (isNormal) {
    return Axios(d).then(d => {
      return d ? d.data : undefined
    })
  } else {
    return Axios(d)
  }
}
export {
  Request,
  RequestPaging,
  Axios,
  request
}