import { ref } from 'vue'

// 抽屉展示
export const drawerActive = ref(false)

// 
export const iframeUrl = ref('')

// 回调
export const closeCallback = ref(() => {})

window.addEventListener('wfClose', () => {
    drawerActive.value = false
    closeCallback.value()
})

export const openDrawer = (url, cb = () => {}) => {
    drawerActive.value = true
    iframeUrl.value = url
    closeCallback.value = cb
}