
import localforage from 'localforage'
import { cloneDeep } from 'lodash'
import { Aes } from '../aes/index'
const Utils = {
    recursion: function (
        list: Array<any>,
        {
          children = 'children',
          callBack = (a: Array<any>) => false
        }
    ) {
        const recursionFun = (list:Array<any>) => {
            for (let item in list) {
            const r = callBack(list[item])
            if (!r) { break; }
            if (list[item][children] && list[item][children].length) {
                recursionFun(list[item][children])
            }
            }
        }
        recursionFun(list)
    },
    parseQuery: function (query: string) {
      if (!query) {
        return false
      }
      const strings = query.split('&');
      const res: any = {};
      for(let i = 0;i < strings.length; i++){
        const str = strings[i]
        const sEq = str.indexOf('=')
        res[str.substr(0, sEq)] = str.substr(sEq + 1);
      }
      return res
    },
    enlargeData: (d: any, minLength = 5) => {
      if (d && d.length < minLength) {
        for (let index = 0; index < minLength; index++) {
          const element = d[index];
          if (!element) {
            d[index] = { type: 'enlarge' }
          }
        }
        return d
      } else {
        return d
      }
    
    },
    reduceData: (d = []) => {
      return d.filter((e: any) => e.type != "enlarge")
    },
    // url 参数添加
    addParamtoUrl (url: string, param: string) {
      const i = url.indexOf('?')
      const n = url.length
      let res = ''
      if (i >= 0 && i !== (n - 1)) {
          // 如果已经含有了参数
          res = `${url}&${param}`
      } else if (i >= 0 && i === (n - 1)) {
          // 结尾只有问号
          res = `${url}${param}`
      } else {
        // 单纯的url
        res = `${url}?${param}`
      }
      return res
    },
    radomKey (c: number = 10000) {
      return `${new Date().getTime().toString(36)}X${Math.floor(Math.random() * c).toString(36)}`
    }
}

const Page = {
  // 跳转到
  /**
   * 
   * @param valueKey 值字段
   * @param value 值
   * @param labelKey 显示标签字段
   * @param label 标签
   */
  toLevel2Menu: async (
    valueKey: string,
    value: string,
    labelKey: string,
    label: string,
    cache: string = '',
    row?: any,
    filterMenu?: (a: any, r: any) => boolean
  ) => {
    const [p1, p2, p3] = window.parent.location.hash.split('/')
    if (window.parent) {
      // 这里需要记录整个过滤逻辑
      if (row) await Db.set(`MenuRow-${p2}-${p3}`, cloneDeep(row))
      if (filterMenu && !await Db.get(`MenuFilter-${p2}-${p3}`)) {
        await Db.set(`MenuFilter-${p2}-${p3}`, filterMenu.toString())
      }
      
      const hash = `${p1}/${p2}/${p3}/${window.btoa(window.encodeURI(`${valueKey}$$${value}$$${labelKey}$$${label}$$${cache}`))}`
      if (hash.length >= 4000) {
        console.error('URL 长度加密后超过 4000字节')
      } else {
        window.parent.location.hash = hash
      }
      
    } else {
      alert('错误: 调用位置错误,没有找到父级主框架')
    }
  },
  getMenuData () {
    const { pm = '' } = Utils.parseQuery(window.location.search.substring(1))
    if (pm) {
      const [ valueKey, value, labelKey, label ] = window.decodeURI(window.atob(pm)).split('$$')
      return {
        [`${valueKey}`]: value,
        [`${labelKey}`]: label
      }
    }
    return {}
  },
  getMenuCache () {
    const { pm = '' } = Utils.parseQuery(window.location.search.substring(1))
    if (pm) {
      const [ valueKey, value, labelKey, label, cache ] = window.decodeURI(window.atob(pm)).split('$$')
      return cache
    }
    return ''
  },
  getMenuParam (pm: any) {
    const [ valueKey, value, labelKey, label ] = window.decodeURI(window.atob(pm)).split('$$')
    if (pm) {
      return {
        valueKey,
        value,
        labelKey,
        label
      }
    }
    return {}
  }

}

type DbType = {
    set: (name: string, value: any) => any,
    get: (name: string) => any,
    remove: (name: string) => any,
    clear: () => void,
}
const Db: DbType = {

  set (name, value) {
    return localforage.setItem(name, value)
  },
  get (name) {
    return localforage.getItem(name)
  },
  remove (name) {
    return localforage.removeItem(name)
  },
  clear () {
    return localforage.clear()
  }

};

// /**
//  * @description 存储 页面数据库 值
//  * @param {String} name name
//  * @param {String} value value 
//  */
// Db.set = function (name, value) {
//   return localforage.setItem(name, value)
// };

// /**
//  * @description 获取 页面数据库 值
//  * @param {String} name name
//  */
// Db.get = function (name) {
//   return localforage.getItem(name)
// }

// /**
//  * @description 移除 页面数据库 值
//  * @param {String} name name
//  */
// Db.remove = function (name) {
//   return localforage.removeItem(name)
// }

// /**
//  * @description 清空数据库
//  */
// Db.clear = function () {
//   return localforage.clear()
// }

export {
    Db,
    Utils,
    Page
}