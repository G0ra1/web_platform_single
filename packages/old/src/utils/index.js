
// 根据扁平菜单数据生成层级菜单数据和路由
export function createMenuOption(v) {
  const basicData = v.map(({
    id: key,
    pid,
    name: label,
    code,
    icon
  }) => {
    return {
      label,
      key,
      code,
      pid
      // icon: renderIcon(icon)
    }
  })
  let res = []
  basicData.forEach(d => {
    // 是否含有父级
    if (d.pid) {
      const pn = basicData.find(f => d.key === d.key)
      if (!pn.children) pn.children = []
      pn.children.push(d)
    } else {
      res.push(d)
    }
  })
  return res
}

// 递归函数
export function recursion(
  list,
  {
    children = 'children',
    callBack = () => { }
  }
) {
  const recursionFun = (list) => {
    for (let item in list) {
      const r = callBack(list[item])
      if (!r) { break; }
      if (list[item][children] && list[item][children].length) {
        recursionFun(list[item][children])
      }
    }
  }
  recursionFun(list)
}

// 字符串复制到粘贴板
export const toClipboard = (str, cb = () => { }) => {
  var tag = document.createElement('textarea');
  tag.value = str;
  document.body.appendChild(tag);
  tag.select();
  document.execCommand('copy');
  tag.remove();
  cb();
}

// export const parseQuery1 = (query) => {
//   const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
//   const obj = {};
//   while (reg.exec(query)) {
//       obj[RegExp.$1] = RegExp.$2;
//   }
//   return obj;
// }

export const parseQuery = (query) => {
  const strings = query.split('&');
  const res = {};
  for (let i = 0; i < strings.length; i++) {
    const str = strings[i]
    const sEq = str.indexOf('=')
    res[str.substr(0, sEq)] = str.substr(sEq + 1);
  }
  return res
}
// 菜单跳转
export const redirectMenu = (item, router) => {
  switch (item.openWay) {
    case "1": // 子菜单
      // router.push(`menu?id=${item.id}`)
      router.push(`/menu/${item.id}`)
      break;
    case "2": // iframe 目标 这里加密
      router.push(`/frame/${window.btoa(item.resourceUrl)}`)
      break;
    case "3": // 路由目标
      router.push(item.resourceUrl)
      break;
    case "4": // 新页面目标
      // 新页面目标需要携带菜单id
      // 这里判断是否已经携带路由参数
      let resourceUrl = item.resourceUrl
      const [url, route] = resourceUrl.split('#/')
      // 这里判断是否已经携带url参数
      // const cop = url.indexOf('.html?') >= 0 ? '&' : '?'
      // if (route) {
      //   resourceUrl = `${url}${cop}menuId=${item.id}#/${route}`
      // } else {
      //   resourceUrl = `${url}${cop}menuId=${item.id}`
      // }
      if (route) {
        resourceUrl = `${url}#/${route}`
      } else {
        resourceUrl = `${url}#/`
      }
      window.open(
        resourceUrl,
        // item.resourceUrl,
        '_blank',
        //'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
      )
      break;
  }
}

// 菜单功能url这
export const makeMenuUrl = (resourceUrl, id) => {
  const [url, route] = resourceUrl.split('#/')
  const cop = url.indexOf('.html?') >= 0 ? '&' : '?'
  let resUrl = ''
  if (route) {
    resUrl = `${url}${cop}menuId=${id}#/${route}`
  } else {
    resUrl = `${url}${cop}menuId=${id}`
  }
  return resUrl
}

// 根据url 获取全路径
export const getFullUrl = (url) => {
  if (url[0] === '/') {
    // 不带域名
    return `${window.origin}${url}`
  } else {

  }
}
export const enlargeData = (d, minLength = 5) => {
  if (d && d.length < minLength) {
    for (let index = 0; index < minLength; index++) {
      const element = d[index];
      if (!element) {
        d[index] = { type: 'enlarge' }
      }
    }
    return d
  } else {
    return []
  }

}
export const reduceData = (d = []) => {
  return d.filter(e => e.type != "enlarge")
}