import { ref } from 'vue'

type MsgStateEm = 'success' | 'warning' | 'error' | 'loading'
type MessageInst = {
    code: string,
    state: MsgStateEm,
    text: string,
    mark?: string
}
// 图标
export const icon = ref<string>('')
// 标题
export const title = ref<string>('')

// 信息
export const messages = ref<Array<MessageInst>>([])

// 关闭开启
export const enableClose = ref<boolean>(false)

// 模态展示
export const visible = ref<boolean>(true)

// 设置信息
export const setMsg = (code: string, text: string, state: MsgStateEm = 'loading', mark: string = '') => {
    const item = messages.value.find(d => d.code === code)
    if (item) {
        item.text = text
        item.state = state
        item.mark = mark
    } else {
        messages.value.push({
            code,
            text,
            state,
            mark
        })
    }
}

// 开始
export const startInit = (_title: string  = '初始化', _icon: string = 'icon-y-shalou', ) => {
    icon.value = _icon
    title.value = _title
    messages.value = []
    visible.value = true
}
// 完成
export const completeInit = () => {
    visible.value = false
}

// 开启关闭

export const setEnableClose = (flag: boolean) => {
    enableClose.value = flag
}