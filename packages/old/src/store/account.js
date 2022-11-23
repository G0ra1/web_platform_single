import { reactive, readonly } from "vue";

// 用户信息
const _userInfo = reactive({});
export const userInfo = reactive(_userInfo);
// 子系统信息
const _system = reactive({});
export const system = reactive(_system);
// 菜单
export const menu = reactive({
  menuHeader: [],
  menuSide: []
});
// 设置用户
export function setUserInfo(val) {
  _userInfo.username = val.username
  _userInfo.userId = val.userId
  _userInfo.phone = val.phone
  _userInfo.realName = val.realName
  _userInfo.group = val.group
  _userInfo.job = val.job
}
// 设置顶部菜单
export function setMenuHeader(val) {
  menu.menuHeader = val
}
// 设置侧栏菜单
export function setMenuSide(val) {
  menu.menuSide = val
}
// 设置子系统信息
export function setSystem(val) {
  _system.systemCode = val.systemCode
  _system.systemName = val.systemName
}

