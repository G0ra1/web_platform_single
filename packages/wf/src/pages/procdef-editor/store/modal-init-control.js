// 初始化模态框的状态管理

import { ref, reactive, computed, watch } from 'vue'
import { cloneDeep } from 'lodash'
console.log('watch, unWatch', watch)
// 模态框展示
export const visible = ref(false)
// 是否完成
export const isFinish = ref(false)
// 开始模式
const startMode = ref(false)

// 是否使用导航自动开始
const iaAutoStart = ref(false)

export const syncModalInit = () => new Promise((resolve, reject) => {
    // 打开窗口
    visible.value = true
    // 当完成后继续同步程序
    watch(isFinish, (s) => {
        if (s) {
            resolve({
                iaAutoStart: iaAutoStart.value,
            })
        }
    })
})
// 是否加载中
export const isLoading = ref(false)
// 步骤
export const stepIndex = ref(0)
// 按钮锁定
// export const backBtnDisabled = computed(() => stepIndex.value === 1)
export const backBtnDisabled = computed(() => false)
export const nextBtnDisabled = computed(() => {
    return stepIndex.value === 5
})
export const finishBtnDisabled = computed(() => stepIndex.value != 5)
export const cancelBtnDisabled = ref(false)
// 点击上一步
export const onHandleBack = () => {
    stepIndex.value--
}
export const onHandleNext = () => {
    stepIndex.value++
}
export const onHandleFinish = (mode) => {
    iaAutoStart.value = mode
    isFinish.value = true
    visible.value = false
}
export const onHandleCancel = () => {
}
