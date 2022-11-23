import Mock from "mockjs";
import mdm from "./mdm"
import portal from "./portal"
import system from "./system"
import message from "./message"
import { recursion } from '/@/utils'

let list = []
for (let i = 0; i < 30; i++) {
  list.push({
    name: Mock.Random.cname(), // 姓名
    id: Math.round(Math.random() * 100000000), // 唯一Id
    sex: Mock.Random.natural(1, 2), // 
    level: '' // 
  });
}
function getUrlParams(name, url) { 
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
  const r = url.split('?')[1].match(reg);  
  if (r != null) return unescape(r[2]); 
return null; 
}

// 权限模拟---------
const resource = [
  ...portal,
  ...mdm,
  ...system,
  ...message
]
// 获取用户信息
Mock.mock(/\/getAuthInfo/, "get", (p) => {
  return {

  };
});

// 获取子系统权限
Mock.mock(/\/getAuthSys/, "get", (p) => {
  return {
    list: [
      {
        code: 'mdm',
        name: '主数据系统',
        icon: 'icon-zhushuju'
      },
      {
        code: 'portal',
        name: '门户系统',
        icon: 'icon-menhu'
      },
      {
        code: 'process',
        name: '工作流系统',
        icon: 'icon-gongzuoliu'
      }
    ]
  };
});
// getxAuthResSingle
Mock.mock(/\/getAuthResSingle/, "get", (p) => {
  const system = getUrlParams('system',p.url)
  const code = getUrlParams('code',p.url)
  let result = {}
  recursion(resource, {
    callBack: item => {
      if (item.system === system && item.code === code) {
        result = item
        return false
      }
      return true
    }
  })
  return {
    result
  };
});

// 获取根据子系统获取功能 接收子系统code 或者 查询关键字
Mock.mock(/\/getAuthRes/, "get", (p) => {
  const system = getUrlParams('system',p.url)
  const search = getUrlParams('search',p.url)
  if (search) {
    return {
      list: resource
    };
  }
  return {
    list: resource.filter(d => d.system === system)
  };
});
