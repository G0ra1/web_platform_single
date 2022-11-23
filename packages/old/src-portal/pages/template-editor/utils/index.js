import { get } from 'lodash'
// 所有JSON处理

// 获取config参数
export const getConfigProp = (el, prop) => {
  return get(el, `__config__.${prop}`, '')
}
// 获取style
export const getStyle = (el) => {
  return get(el, `__style__`, {})
}

// 从json中获取
export const getProp = () => {

}
// 设定属性
/**
 * 根据值设定值
 */
export const setProp = (v) => {
  // const type = typeof v
}
// 获取时间戳唯一id
export const getNID = (p = '', s = '') => {
  return `${p}${new Date().getTime()}${s}`
}

// 获取url
export const getModelUrl = (el) => {
  return `./${get(el, `__config__.modelType`, '')}/${get(el, `__config__.tag`, '')}`
}
