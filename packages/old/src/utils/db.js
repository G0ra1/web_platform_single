import localforage from 'localforage'


const db = {};

/**
 * @description 存储 页面数据库 值
 * @param {String} name name
 * @param {String} value value 
 */
db.set = function (name, value) {
  return localforage.setItem(name, value)
};

/**
 * @description 获取 页面数据库 值
 * @param {String} name name
 */
db.get = function (name) {
  return localforage.getItem(name)
}

/**
 * @description 移除 页面数据库 值
 * @param {String} name name
 */
db.remove = function (name) {
  return localforage.removeItem(name)
}

/**
 * @description 清空数据库
 */
db.clear = function () {
  return localforage.clear()
}
export default db