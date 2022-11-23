import { h, ref, reactive } from "vue";
import Setting from '/setting.js'
import cookies from "/@/utils/cookies.js";
import db from '/@/utils/db.js'

export const socketState = ref('cuowu') // cuowu shalou duigou
export const socketStateColor = ref('red') // cuowu shalou duigou

export const videoRef = ref(null)
// 状态信息
export const state = reactive({
  isLoading: false
});
// 设置整体加载状态
export function setIsLoading(val) {
  state.isLoading = val
}
// 这里加入socket
export const notification = ref(null)
let ws;
export const createWs = async ({
  msgCallBack = () => {}
}) => {
  socketState.value = 'shalou'
  socketStateColor.value = 'yellow'
  const token = cookies.get("token");
  const tokenType = cookies.get("tokenType");
  let userId
  await db.get("userInfo").then((res) => {
    userId = res.id
  });
  ws = new WebSocket(`${Setting.socketUrl}/msg?token=${tokenType} ${token}&userId=${userId}`);
  ws.onopen = function () {
    socketState.value = 'duigou'
    socketStateColor.value = 'green'
  };
  
  ws.onmessage = function (evt) {
    msgCallBack(JSON.parse(evt.data))
  };
  ws.onclose = function () {
      // 关闭 websocket
      console.log("连接已关闭");
      socketState.value = 'cuowu'
      socketStateColor.value = 'red'
  };
}
